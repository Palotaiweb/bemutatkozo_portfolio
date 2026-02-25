# Projekt Ügynök Gyökérmemória (AGENTS.md)
*AI Instruktor fájl - Olvasd el a feladatok megkezdése előtt!*

## 🎯 Identitás és Szerep

Te egy **Kódoló Ügynök** vagy. A feladatod: Palotai Dániel számára egy prémium, egyoldalas AI Oktatói Portfólió Landing Page elkészítése, amelyet az **Euzert** és **Certop** felnőttképző intézményeknek küld. Az oldal maga a bizonyíték: a tökéletes kód = a kompetencia demonstrációja. **Semmi generic, semmi AI-slop.**

## 🏗️ Fájlrendszer és Kontextus

*(Csak azt olvasd be, amire a feladathoz szükséged van – Context Rot elkerülése!)*

- `PROJECT_MAP.md` – Állapotok, jelenlegi feladat. **MINDIG frissítsd session végén!**
- `docs/TASKS.md` – Mit kell épp csinálni. Kövesd a Milestone sorrendet!
- `docs/PRD.md` – Üzleti célok, user story-k, siker mérőszámok.
- `docs/ARCHITECTURE.md` – Tech stack, fájlstruktúra, Supabase séma, Edge Function logika.
- `docs/DESIGN_SYSTEM.md` – Színek, tipográfia, komponens állapotok. **Ez a vizuális biblia.**
- `docs/SEO.md` – Meta tagek, Netlify headers, Lighthouse checklist.
- `docs/CLIENT_PROFILE.md` – A megrendelő és a célközönség. Hangulathoz és hangvételhez.

## 🧩 Tech Stack

- **Frontend:** HTML5 + Vanilla CSS + Vanilla JavaScript (nincs framework!)
- **Hosting:** Netlify (`netlify.toml` konfigurációval)
- **Auth:** **Appwrite Cloud Auth** – Magic URL (meghívásos modell) ← Supabase helyett!
- **DB:** **Appwrite Database** (Collections: `profiles` + `demo_logs`, Permissions-sel védett)
- **LLM hívás:** **Netlify Function** (`netlify/functions/generate-demo.mjs`) – soha nem frontenden!
- **Fontok:** Google Fonts – `Outfit` (headings) + `Inter` (body)
- **Animációk:** Vanilla JS + CSS `@keyframes` (nincs GSAP, nincs külső animációs lib)

## 🛠️ Alapvető Parancsok

- **Fejlesztői preview:** `npx netlify dev` (Netlify Functions is elindul lokálisan)
- **Netlify CLI deploy:** `netlify deploy --prod`
- **Appwrite konzol:** [cloud.appwrite.io](https://cloud.appwrite.io) – felhasználók és DB itt kezelhetők

## 🛡️ Boundary Requirements (Szigorú Határok)

✅ **Mindig tedd meg:**
- Minden CSS custom property centralizálva legyen a `css/main.css`-ben (nem inline style-ok!)
- A `docs/DESIGN_SYSTEM.md` tokeneit használd – soha ne hardcodeolj hex színt egyenesen a CSS-be, ahol már van token
- Minden session végén frissítsd a `PROJECT_MAP.md`-t
- Az Appwrite `projectId`-t a HTML-ből töltsd be (`window.ENV` közvetítésén keresztül – SOHA ne commitold .env fájlba az API KEY-t)
- Minden `<img>` tagnek legyen `alt`, `width`, `height` attribútuma

⚠️ **Kérdezz rá először (Dániel jóváhagyása szükséges):**
- Ha új npm csomagot, külső JS library-t (CDN-ről is!) szeretnél hozzáadni
- Ha az Appwrite adatbázis sémát módosítani kell az `ARCHITECTURE.md`-ban leírton túl
- Ha a TASKS.md Milestone sorrendjétől el kellene térni
- Ha az LLM modellt (OpenAI vs. Claude) meg kell változtatni

🚫 **Soha ne csináld:**
- Ne használj sima szabványos `<img>` taget külső, optimalizálatlan képekre – minden külső kép lazy-load és explicit méretekkel töltendő be
- Ne felejtsd le a `<title>` és `<meta description>` elemeket az `index.html`-ről!
- Ne exponáld az LLM API kulcsot a frontend JS kódban vagy a HTML-ben – **csak a Netlify Functionben él**
- Ne generálj placeholder UI-t működő logika nélkül (pl. „itt lesz a demó" szöveg)
- Ne használj AI-slop designt: nincs generikus lila-kék gradiens, nincs túlzottan lekerekített minden kártya

## ✈️ Pre-Flight Quality Gate (Végső Tesztelés – Milestone 5)

Mielőtt a projektet késznek nyilvánítod:

1. **Build & Validáció:** HTML validator futtatása; nincsenek console.error hibák böngészőben
2. **Biztonság:** Keresés a JS fájlokban API kulcsra: `grep -r "sk-" ./js/` – ha talált valamit, azonnal javítsd!
3. **RLS Ellenőrzés:** Supabase dashboardon `profiles` és `demo_logs` táblák – RLS be van kapcsolva?
4. **Happy Path:** Végigmegy-e a teljes folyamat: oldal betölt → demo → login modál → Magic Link → bejelentkezés → témaválasztás → LLM válasz megjelenik?
5. **Lighthouse:** Performance ≥ 90, `noindex` aktív, OG image elérhető

## ✨ Kódolási és Stílus Standardok

- Korai visszatérések (early return), kerüld a mélyen egymásba ágyazott kódot
- Értelmes elnevezések (`fetchDemoResult` nem `fn1`)
- Kommenteld a nem-triviális logikát (főleg a Supabase auth flow-t)
- Minden JS fájl önálló, `import`/`export`-tal ha szükséges – ne legyen egy 1000 soros `main.js`
- **Hangvétel a UI szövegekben: tegező, közvetlen, magabiztos – de emberi**
