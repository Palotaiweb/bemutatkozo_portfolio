/* =========================================================
   DEMO.JS – Interaktív AI Demo Szekció Logika
   Palotai Dániel AI Oktatói Portfólió

   Témák közül választ a user → fetch a Netlify Function-re
   → streaming / egyszeri JSON válasz → markdown megjelenítés
   ========================================================= */

'use strict';

/* ---------------------------------------------------------
   TÉMÁK (a lenyíló listában megjelennek)
   --------------------------------------------------------- */
const DEMO_TOPICS = [
    {
        id: 'curriculum',
        label: 'AI-asszisztált tananyag tervezés 10 perc alatt',
        description: 'Hogyan generáljunk adaptív tananyagot AI-val gyorsan?',
    },
    {
        id: 'prompt-design',
        label: 'Prompt-tervezés trénereknek',
        description: 'Professzionális promptok a képzési munkához.',
    },
    {
        id: 'personal-learning',
        label: 'AI mint személyre szabott tanulási asszisztens',
        description: 'Személyre szabott tanulási útvonalak AI segítségével.',
    },
];

/* ---------------------------------------------------------
   DEMO UNLOCKED – az auth.js hívja ezt sikeres login után
   --------------------------------------------------------- */
window.unlockDemo = function (session) {
    const gate = document.getElementById('demo-gate');
    const content = document.getElementById('demo-content');
    if (gate) gate.style.display = 'none';
    if (content) {
        content.style.display = 'block';
        content.classList.add('anim-fade-in-up', 'is-visible');
    }
};

/* ---------------------------------------------------------
   DEMO API HÍVÁS → Netlify Function
   --------------------------------------------------------- */
async function runDemo(topicId) {
    const session = window.authSession;
    if (!session) {
        alert('A demóhoz bejelentkezés szükséges.');
        return;
    }

    const topic = DEMO_TOPICS.find((t) => t.id === topicId);
    if (!topic) return;

    setDemoState('loading');

    try {
        // Appwrite JWT lekérése a session-ből
        const client = getAppwriteClientForDemo();
        let jwt = '';
        if (client) {
            try {
                const account = new Appwrite.Account(client);
                const jwtObj = await account.createJWT();
                jwt = jwtObj.jwt;
            } catch (jwtErr) {
                console.warn('[demo] JWT generálási hiba, session nélkül folytatjuk:', jwtErr);
            }
        }

        const response = await fetch('/.netlify/functions/generate-demo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
            },
            body: JSON.stringify({ topicId, topicLabel: topic.label }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('SESSION_EXPIRED');
            }
            if (response.status === 504) {
                throw new Error('LLM_TIMEOUT');
            }
            throw new Error(`HTTP_${response.status}`);
        }

        const data = await response.json();
        displayDemoResult(data.content, topic.label);
        setDemoState('result');

    } catch (err) {
        console.error('[demo] Hiba:', err);

        if (err.message === 'SESSION_EXPIRED') {
            setDemoState('error', 'A bejelentkezési token lejárt. Kérjük, frissítsd az oldalt és lépj be újra.');
            window.authSession = null;
        } else if (err.message === 'LLM_TIMEOUT') {
            setDemoState('error', 'Az AI most túlterhelt – kérjük, próbáld újra egy perc múlva.');
        } else {
            setDemoState('error', 'Valami hiba történt. Kérjük, próbáld újra.');
        }
    }
}

function getAppwriteClientForDemo() {
    if (!window.ENV?.APPWRITE_ENDPOINT || !window.ENV?.APPWRITE_PROJECT_ID) return null;
    const client = new Appwrite.Client();
    client.setEndpoint(window.ENV.APPWRITE_ENDPOINT).setProject(window.ENV.APPWRITE_PROJECT_ID);
    return client;
}

/* ---------------------------------------------------------
   MARKDOWN → HTML (minimális, külső lib nélkül)
   --------------------------------------------------------- */
function simpleMarkdownToHtml(text) {
    return text
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
        .replace(/\n{2,}/g, '</p><p>')
        .replace(/^(?!<[hul])(.+)$/gm, '<p>$1</p>')
        .trim();
}

/* ---------------------------------------------------------
   UI STATE MANAGEMENT
   --------------------------------------------------------- */
function setDemoState(state, errorMessage = '') {
    const loadingEl = document.getElementById('demo-loading');
    const resultEl = document.getElementById('demo-result');
    const errorEl = document.getElementById('demo-error');
    const runBtn = document.getElementById('demo-run-btn');

    // Reset
    if (loadingEl) loadingEl.style.display = 'none';
    if (resultEl) resultEl.style.display = 'none';
    if (errorEl) errorEl.style.display = 'none';

    if (state === 'loading') {
        if (loadingEl) loadingEl.style.display = 'flex';
        if (runBtn) { runBtn.disabled = true; runBtn.textContent = 'Generálás...'; }
    } else if (state === 'result') {
        if (resultEl) resultEl.style.display = 'block';
        if (runBtn) { runBtn.disabled = false; runBtn.textContent = '↺ Újra generálás'; }
    } else if (state === 'error') {
        if (errorEl) {
            errorEl.textContent = errorMessage;
            errorEl.style.display = 'block';
        }
        if (runBtn) { runBtn.disabled = false; runBtn.textContent = 'Generálás'; }
    } else {
        // idle
        if (runBtn) { runBtn.disabled = false; runBtn.textContent = 'Generálás'; }
    }
}

function displayDemoResult(content, topicLabel) {
    const resultEl = document.getElementById('demo-result');
    if (!resultEl) return;

    resultEl.innerHTML = `
    <div class="demo-result-header">
      <span class="badge badge--primary">AI Eredmény</span>
      <span class="demo-result-topic">${topicLabel}</span>
    </div>
    <div class="demo-result-body">
      ${simpleMarkdownToHtml(content)}
    </div>
  `;
}

/* ---------------------------------------------------------
   INIT – Demo szekció felépítése
   --------------------------------------------------------- */
function initDemo() {
    const demoSection = document.getElementById('demo');
    if (!demoSection) return;

    // Téma nevét megjelenítjük a topic selector-ban
    const topicSelect = document.getElementById('demo-topic-select');
    if (topicSelect) {
        DEMO_TOPICS.forEach((topic) => {
            const opt = document.createElement('option');
            opt.value = topic.id;
            opt.textContent = topic.label;
            topicSelect.appendChild(opt);
        });
    }

    // Generálás gomb
    const runBtn = document.getElementById('demo-run-btn');
    if (runBtn) {
        runBtn.addEventListener('click', () => {
            const topicId = topicSelect?.value || DEMO_TOPICS[0].id;
            runDemo(topicId);
        });
    }
}

document.addEventListener('DOMContentLoaded', initDemo);
