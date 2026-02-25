/* =========================================================
   AUTH.JS – Appwrite Magic URL Authentication
   Palotai Dániel AI Oktatói Portfólió

   Flow:
   1. User kattint "Demo indítása" → login modál nyílik
   2. Email beírása → createMagicURLToken() hívás
   3. Appwrite magic link emailt küld
   4. User visszatér az oldalra (?userId=...&secret=...)
   5. updateMagicURLSession() → session létrejön
   6. Demo szekció feloldva
   ========================================================= */

'use strict';

/* ---------------------------------------------------------
   CONFIG – window.ENV-ből töltjük be (soha ne hardcodeolj!)
   Az index.html-ben egy <script>window.ENV = {...}</script>
   blokk adja át a publikus config értékeket.
   --------------------------------------------------------- */
function getAppwriteConfig() {
    if (!window.ENV?.APPWRITE_ENDPOINT || !window.ENV?.APPWRITE_PROJECT_ID) {
        console.error('[auth] Appwrite config hiányzik a window.ENV-ből!');
        return null;
    }
    return {
        endpoint: window.ENV.APPWRITE_ENDPOINT,
        projectId: window.ENV.APPWRITE_PROJECT_ID,
    };
}

/* ---------------------------------------------------------
   APPWRITE SDK – CDN-ről töltjük (index.html <head>)
   --------------------------------------------------------- */
function getClient() {
    const cfg = getAppwriteConfig();
    if (!cfg) return null;

    const client = new Appwrite.Client();
    client.setEndpoint(cfg.endpoint).setProject(cfg.projectId);
    return client;
}

/* ---------------------------------------------------------
   SESSION CHECK – oldalbetöltéskor futtatjuk
   --------------------------------------------------------- */
async function checkSession() {
    // Magic URL callback kezelése (?userId=...&secret=...)
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const secret = params.get('secret');

    if (userId && secret) {
        await handleMagicURLCallback(userId, secret);
        // URL tisztítása a paraméterektől
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, '', cleanUrl);
        return;
    }

    // Meglévő session ellenőrzése
    try {
        const client = getClient();
        if (!client) return;

        const account = new Appwrite.Account(client);
        const session = await account.get();
        if (session && session.$id) {
            onAuthSuccess(session);
        }
    } catch {
        // Nincs aktív session – ez normális, nem hiba
        onAuthLoggedOut();
    }
}

/* ---------------------------------------------------------
   MAGIC URL CALLBACK kezelése
   --------------------------------------------------------- */
async function handleMagicURLCallback(userId, secret) {
    try {
        const client = getClient();
        if (!client) return;

        const account = new Appwrite.Account(client);
        const session = await account.updateMagicURLSession(userId, secret);
        onAuthSuccess(session);
    } catch (err) {
        console.error('[auth] Magic URL session hiba:', err);
        showAuthError('A bejelentkezési link lejárt vagy érvénytelen. Kérj új linket.');
    }
}

/* ---------------------------------------------------------
   MAGIC URL KÉRÉS KÜLDÉSE
   --------------------------------------------------------- */
async function requestMagicLink(email) {
    if (!email || !email.includes('@')) {
        showAuthError('Kérjük, adj meg érvényes email címet.');
        return;
    }

    setLoginButtonState('loading');

    try {
        const client = getClient();
        if (!client) throw new Error('Appwrite config hiányzik');

        const account = new Appwrite.Account(client);
        const redirectUrl = window.location.origin + window.location.pathname;

        // Egyedi userId generálása (Appwrite ID.unique() helyett UUID)
        const userId = 'user-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9);

        await account.createMagicURLToken(userId, email, redirectUrl);
        showMagicLinkSent(email);

    } catch (err) {
        console.error('[auth] Magic URL token hiba:', err);

        // Appwrite 429 – nem meghívott felhasználó vagy rate limit
        if (err?.code === 429) {
            showAuthError('Túl sok kísérlet. Kérjük, várj pár percet, majd próbáld újra.');
        } else if (err?.code === 401) {
            showAuthError('Ez az email cím nincs a meghívottak listáján. Kérj hozzáférést Palotai Dánieltől.');
        } else {
            showAuthError('Végbement egy hiba. Kérjük, próbáld újra.');
        }

        setLoginButtonState('idle');
    }
}

/* ---------------------------------------------------------
   KIJELENTKEZÉS
   --------------------------------------------------------- */
async function logout() {
    try {
        const client = getClient();
        if (!client) return;

        const account = new Appwrite.Account(client);
        await account.deleteSession('current');
    } catch (err) {
        console.error('[auth] Logout hiba:', err);
    } finally {
        onAuthLoggedOut();
    }
}

/* ---------------------------------------------------------
   AUTH STATE CALLBACKS
   --------------------------------------------------------- */
function onAuthSuccess(session) {
    // Globálisan eltároljuk a session-t a demo.js számára
    window.authSession = session;

    // Login modál elrejtése
    closeLoginModal();

    // Demo szekció feloldása
    if (typeof window.unlockDemo === 'function') {
        window.unlockDemo(session);
    }

    // Nav frissítése (Logout gomb megjelenítése)
    updateNavForLoggedIn();
}

function onAuthLoggedOut() {
    window.authSession = null;
    lockDemo();
    updateNavForLoggedOut();
}

/* ---------------------------------------------------------
   UI HELPERS
   --------------------------------------------------------- */
function showAuthError(message) {
    const el = document.getElementById('auth-error');
    if (!el) return;
    el.textContent = message;
    el.style.display = 'block';
}

function clearAuthError() {
    const el = document.getElementById('auth-error');
    if (!el) return;
    el.textContent = '';
    el.style.display = 'none';
}

function showMagicLinkSent(email) {
    const form = document.getElementById('login-form');
    const success = document.getElementById('login-success');
    if (form) form.style.display = 'none';
    if (success) {
        success.innerHTML = `
      <div class="auth-success-icon">✓</div>
      <h3>Link elküldve!</h3>
      <p>Ellenőrizd a <strong>${email}</strong> postaládádat, és kattints a kapott linkre a bejelentkezéshez.</p>
    `;
        success.style.display = 'block';
    }
}

function setLoginButtonState(state) {
    const btn = document.getElementById('login-submit-btn');
    if (!btn) return;

    if (state === 'loading') {
        btn.textContent = 'Küldés...';
        btn.disabled = true;
        btn.classList.add('btn--disabled');
    } else {
        btn.textContent = 'Magic Link küldése';
        btn.disabled = false;
        btn.classList.remove('btn--disabled');
    }
}

function updateNavForLoggedIn() {
    const logoutBtn = document.getElementById('nav-logout-btn');
    if (logoutBtn) logoutBtn.style.display = 'inline-flex';
}

function updateNavForLoggedOut() {
    const logoutBtn = document.getElementById('nav-logout-btn');
    if (logoutBtn) logoutBtn.style.display = 'none';
}

function lockDemo() {
    const demoContent = document.getElementById('demo-content');
    const demoGate = document.getElementById('demo-gate');
    if (demoContent) demoContent.style.display = 'none';
    if (demoGate) demoGate.style.display = 'flex';
}

/* ---------------------------------------------------------
   LOGIN MODAL CONTROL
   --------------------------------------------------------- */
function openLoginModal() {
    const modal = document.getElementById('login-modal');
    const overlay = document.getElementById('modal-overlay');
    if (modal) modal.classList.add('is-open');
    if (overlay) overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';

    // Focus az email inputra
    setTimeout(() => {
        const input = document.getElementById('login-email-input');
        if (input) input.focus();
    }, 100);
}

function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    const overlay = document.getElementById('modal-overlay');
    if (modal) modal.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
    clearAuthError();
}

/* ---------------------------------------------------------
   INIT – Event listenerek bekötése
   --------------------------------------------------------- */
function initAuth() {
    // Demo trigger gomb → login modál megnyitása (ha nincs session)
    document.addEventListener('click', (e) => {
        if (e.target.closest('#demo-trigger, #demo-gate-btn')) {
            if (window.authSession) {
                // Már be van jelentkezve → csak scrollozzunk le
                document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
            } else {
                openLoginModal();
            }
        }

        // Modál bezárása az overlay-re kattintva
        if (e.target.closest('#modal-overlay')) {
            closeLoginModal();
        }

        // X gomb
        if (e.target.closest('#modal-close-btn')) {
            closeLoginModal();
        }

        // Logout
        if (e.target.closest('#nav-logout-btn')) {
            logout();
        }
    });

    // Login form submit
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearAuthError();
            const email = document.getElementById('login-email-input')?.value?.trim();
            await requestMagicLink(email);
        });
    }

    // Escape billentyűre modál bezárása
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLoginModal();
    });

    // Session ellenőrzése oldalbetöltéskor
    checkSession();
}

document.addEventListener('DOMContentLoaded', initAuth);
