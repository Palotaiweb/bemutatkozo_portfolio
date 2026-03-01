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
const CHAT_PANEL_ID = 'chat-panel';
const CHAT_MSGS_ID = 'chat-messages';
const CHAT_INPUT_ID = 'chat-input';
const CHAT_SEND_ID = 'chat-send-btn';



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

  const inputEl = document.getElementById(CHAT_INPUT_ID);
  const sendBtn = document.getElementById(CHAT_SEND_ID);

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

    // Appwrite JWT Token lekérése az n8n hitelesítéshez
    let jwtToken = null;
    try {
      if (window.ENV?.APPWRITE_ENDPOINT && window.ENV?.APPWRITE_PROJECT_ID) {
        const client = new Appwrite.Client();
        client.setEndpoint(window.ENV.APPWRITE_ENDPOINT).setProject(window.ENV.APPWRITE_PROJECT_ID);
        const account = new Appwrite.Account(client);

        // Ez egy rövid élettartamú generált token, amivel az n8n bizonyosodhat a felhasználó jogosságáról
        const jwtResponse = await account.createJWT();
        jwtToken = jwtResponse?.jwt;
      }
    } catch (jwtErr) {
      console.warn('[chat] JWT token lekérés sikertelen, folytatás token nélkül:', jwtErr);
    }

    // HTTP fejlécek összeállítása
    const headers = { 'Content-Type': 'application/json' };
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    }

    // Üzenet beküldése az n8n webhooknak
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: headers,
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
   INIT
   --------------------------------------------------------- */

let isChatInitialized = false;

function initChat() {
  if (isChatInitialized) return;

  // Üdvözlő AI üzenet, ha még nincs egy sem
  const messagesEl = document.getElementById(CHAT_MSGS_ID);
  if (messagesEl && messagesEl.children.length === 0) {
    appendBubble(
      'ai',
      'Szia! Kérdezz a Prompt Engineering képzések tartalmáról. Miben segíthetek?'
    );
  }

  initChatInput();
  isChatInitialized = true;
}

// Ha az auth.js session-változást jelent és sikeres (bejelentkeztünk), inicializáljuk a chatet
window.addEventListener('appwrite:session-changed', () => {
  if (window.authSession) {
    initChat();
  }
});
