/* =========================================================
   CHAT.JS – RAG Chatbot (n8n webhook alapú)
   Palotai Dániel AI Oktatói Portfólió

   Feladat: Az Appwrite session alapján megmutatja vagy elrejti
   a chat gate-et. Bejelentkezve n8n webhook-ot hív meg.
   ========================================================= */

'use strict';

/* ---------------------------------------------------------
   CONSTANTS
   --------------------------------------------------------- */
const CHAT_GATE_ID    = 'chat-gate';
const CHAT_PANEL_ID   = 'chat-panel';
const CHAT_MSGS_ID    = 'chat-messages';
const CHAT_INPUT_ID   = 'chat-input';
const CHAT_SEND_ID    = 'chat-send-btn';
const CHAT_LOGIN_BTN  = 'chat-login-btn';

/* ---------------------------------------------------------
   SESSION HELPER
   Importálja az Appwrite account objektumot az auth.js-ből,
   de defenzívan kezeli, ha az még nem inicializálódott.
   --------------------------------------------------------- */
async function getActiveSession() {
  try {
    if (
      typeof window.__appwriteAccount === 'undefined' ||
      window.__appwriteAccount === null
    ) {
      return null;
    }
    return await window.__appwriteAccount.getSession('current');
  } catch {
    return null;
  }
}

/* ---------------------------------------------------------
   UI HELPERS
   --------------------------------------------------------- */

/**
 * Egy új chat buborékot fűz az üzenetlistához.
 * @param {'user'|'ai'|'loading'} type
 * @param {string} [text]
 * @returns {HTMLElement} a létrehozott elem (loading eltávolításához)
 */
function appendBubble(type, text = '') {
  const messagesEl = document.getElementById(CHAT_MSGS_ID);
  if (!messagesEl) return null;

  const bubble = document.createElement('div');
  bubble.classList.add('chat-bubble', `chat-bubble--${type}`);

  if (type === 'loading') {
    bubble.innerHTML = '<span></span><span></span><span></span>';
    bubble.setAttribute('aria-label', 'Az AI gondolkodik...');
  } else {
    bubble.textContent = text;
  }

  messagesEl.appendChild(bubble);
  // Görgetés az utolsó üzenetre
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return bubble;
}

/** Egyszerű session ID generálás (storage-ba mentve) */
function getSessionId() {
  const key = 'chat_session_id';
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

/* ---------------------------------------------------------
   CORE: üzenet küldése az n8n webhook felé
   --------------------------------------------------------- */
async function sendMessage(userText) {
  const webhookUrl = window.ENV?.N8N_WEBHOOK_URL;

  const inputEl    = document.getElementById(CHAT_INPUT_ID);
  const sendBtn    = document.getElementById(CHAT_SEND_ID);

  // UI: loading állapot
  if (inputEl) inputEl.disabled = true;
  if (sendBtn) sendBtn.disabled = true;
  appendBubble('user', userText);
  const loadingBubble = appendBubble('loading');

  try {
    // Ha nincs webhook URL konfigurálva, jelezzük (fejlesztői állapot)
    if (!webhookUrl) {
      throw new Error('NO_WEBHOOK');
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userText,
        session_id: getSessionId(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP_${response.status}`);
    }

    const data = await response.json();
    // n8n visszaadhat { output: "..." } vagy { text: "..." } formában
    const aiReply =
      data?.output || data?.text || data?.message || 'Nem kaptam érthető választ.';

    loadingBubble?.remove();
    appendBubble('ai', aiReply);
  } catch (err) {
    loadingBubble?.remove();

    let errorMsg;
    if (err.message === 'NO_WEBHOOK') {
      errorMsg =
        '⚙️ A chatbot még nincs bekonfigurálva (n8n webhook URL hiányzik). Hamarosan elérhető lesz!';
    } else if (err.name === 'TypeError') {
      errorMsg = '🔌 Nem sikerült csatlakozni a szerverhez. Ellenőrizd az internet-kapcsolatod.';
    } else {
      errorMsg = `❌ Hiba történt. (${err.message})`;
    }

    appendBubble('ai', errorMsg);
  } finally {
    // UI: visszaállítás
    if (inputEl) {
      inputEl.disabled = false;
      inputEl.value = '';
      inputEl.focus();
      // Textarea auto-height reset
      inputEl.style.height = 'auto';
    }
    if (sendBtn) sendBtn.disabled = false;
  }
}

/* ---------------------------------------------------------
   INPUT: auto-growing textarea + Enter küldés
   --------------------------------------------------------- */
function initChatInput() {
  const inputEl = document.getElementById(CHAT_INPUT_ID);
  const sendBtn = document.getElementById(CHAT_SEND_ID);
  if (!inputEl || !sendBtn) return;

  // Auto-grow
  inputEl.addEventListener('input', () => {
    inputEl.style.height = 'auto';
    inputEl.style.height = `${inputEl.scrollHeight}px`;
  });

  // Enter = küldés (Shift+Enter = sortörés)
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  sendBtn.addEventListener('click', handleSend);
}

function handleSend() {
  const inputEl = document.getElementById(CHAT_INPUT_ID);
  if (!inputEl) return;
  const text = inputEl.value.trim();
  if (!text) return;
  sendMessage(text);
}

/* ---------------------------------------------------------
   GATE: mutat/elrejt Appwrite session alapján
   --------------------------------------------------------- */
async function initChatGate() {
  const gateEl  = document.getElementById(CHAT_GATE_ID);
  const panelEl = document.getElementById(CHAT_PANEL_ID);
  if (!gateEl || !panelEl) return;

  const session = await getActiveSession();

  if (session) {
    // Bejelentkezve → chat panel látható
    gateEl.style.display  = 'none';
    panelEl.style.display = 'flex';

    // Üdvözlő AI üzenet
    appendBubble(
      'ai',
      'Szia! Kérdezz az Euzert kurzus tartalmáról. Miben segíthetek?'
    );
    initChatInput();
  } else {
    // Nincs session → gate látható
    gateEl.style.display  = 'flex';
    panelEl.style.display = 'none';

    // A „Bejelentkezés" gomb megnyitja a login modált
    const loginBtn = document.getElementById(CHAT_LOGIN_BTN);
    loginBtn?.addEventListener('click', () => {
      // Ugyanaz a modál, mint a demo szekciónál
      document.getElementById('login-modal')?.classList.add('is-open');
      document.getElementById('modal-overlay')?.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  }
}

/* ---------------------------------------------------------
   INIT
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initChatGate();
});

// Ha az auth.js session-változást jelent (login/logout esemény), frissülj
window.addEventListener('appwrite:session-changed', () => {
  initChatGate();
});
