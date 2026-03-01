/* =========================================================
   AUTH.JS – Appwrite Email/Password Authentication
   Palotai Dániel AI Oktatói Portfólió

   Flow:
   1. User látja a globális Login Wallt
   2. Email/Jelszó beírása → loginWithEmail() hívás
   3. Appwrite bejelentkeztet, session létrejön
   4. Login Wall eltűnik, oldal tartalma megjelenik
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
    // Meglévő session ellenőrzése
    try {
        const client = getClient();
        if (!client) return;

        const account = new Appwrite.Account(client);
        const session = await account.get();

        // Appwrite account.get() visszaadhat egy objektumot anonymous session esetén is.
        // Biztosítanunk kell, hogy ténylegesen bejelentkezett felhasználóról van szó.
        // (Például van email címe, nem anonim)
        if (session && session.$id && session.email) {
            onAuthSuccess(session);
        } else {
            onAuthLoggedOut();
        }
    } catch {
        // Nincs aktív session – ez normális, nem hiba
        onAuthLoggedOut();
    }
}

/* ---------------------------------------------------------
   BEJELENTKEZÉS KÜLDÉSE (Email / Jelszó)
   --------------------------------------------------------- */
async function loginWithEmail(email, password) {
    if (!email || !email.includes('@')) {
        showAuthError('Kérjük, adj meg érvényes email címet.');
        return;
    }

    if (!password) {
        showAuthError('Kérjük, add meg a jelszót.');
        return;
    }

    setLoginButtonState('loading');

    try {
        const client = getClient();
        if (!client) throw new Error('Appwrite config hiányzik');

        const account = new Appwrite.Account(client);

        // Hagyományos Email/Password bejelentkezés
        const session = await account.createEmailPasswordSession(email, password);
        onAuthSuccess(session);

    } catch (err) {
        console.error('[auth] Login hiba:', err);

        // Appwrite specifikus hibák lekezelése
        if (err?.code === 401) {
            showAuthError('Helytelen email cím vagy jelszó.');
        } else if (err?.code === 429) {
            showAuthError('Túl sok kísérlet. Kérjük, várj pár percet, majd próbáld újra.');
        } else {
            showAuthError('Végbement egy hiba a bejelentkezés során. Próbáld újra.');
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
    // Globálisan eltároljuk a session-t a többi script számára
    window.authSession = session;
    window.dispatchEvent(new Event('appwrite:session-changed'));

    // UI váltás: Login Wall elrejtése, App tartalom megjelenítése
    const loginWall = document.getElementById('global-login-wall');
    const appWrapper = document.getElementById('app-wrapper');

    if (loginWall) loginWall.classList.add('is-hidden');
    if (appWrapper) appWrapper.style.display = 'block';

    // Nav frissítése (Logout gomb megjelenítése)
    updateNavForLoggedIn();
}

function onAuthLoggedOut() {
    window.authSession = null;
    window.dispatchEvent(new Event('appwrite:session-changed'));

    // UI váltás: App tartalom elrejtése, Login Wall megjelenítése
    const loginWall = document.getElementById('global-login-wall');
    const appWrapper = document.getElementById('app-wrapper');

    if (loginWall) loginWall.classList.remove('is-hidden');
    if (appWrapper) appWrapper.style.display = 'none';

    setLoginButtonState('idle'); // Visszaállítjuk a gombot
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

function setLoginButtonState(state) {
    const btn = document.getElementById('login-submit-btn');
    if (!btn) return;

    if (state === 'loading') {
        btn.textContent = 'Bejelentkezés...';
        btn.disabled = true;
        btn.classList.add('btn--disabled');
    } else {
        btn.textContent = 'Bejelentkezés';
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

/* ---------------------------------------------------------
   INIT – Event listenerek bekötése
   --------------------------------------------------------- */
function initAuth() {
    // Globális event listener a kilépéshez
    document.addEventListener('click', (e) => {
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
            const password = document.getElementById('login-password-input')?.value;
            await loginWithEmail(email, password);
        });
    }

    // Session ellenőrzése oldalbetöltéskor (megjeleníti a Login Wallt vagy alkalmazást)
    checkSession();
}

document.addEventListener('DOMContentLoaded', initAuth);
