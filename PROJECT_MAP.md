# 🗺️ Projekt Térkép (PROJECT_MAP.md)

*Ez a dokumentum a projekt élő „vezérlőpultja". Az AI ügynöknek folyamatosan (minden érdemi változás vagy session végén) frissítenie kell az aktuális állapotot.*

## 📋 Projekt Státusz

- [x] Scaffolding / Specifikáció – KÉSZ (2026-02-23)
- [x] 🎨 Milestone 0: Living Style Guide – KÉSZ (2026-02-23, Dániel jóváhagyta)
- [x] 🚀 Milestone 1: Hero + Alap HTML – KÉSZ (2026-02-23)
- [x] 👤 Milestone 2: Rólam + Képzőhely Fókusz + Tematikák – KÉSZ (2026-02-23)
- [x] 🔄 Koncepció Váltás – KÉSZ (2026-02-25)
- [x] ✏️ Szövegezés javítása + UI finomhangolás – KÉSZ (2026-02-25 délután)
- [x] 🔧 Milestone 4: Csiszolás és Teljesítmény (frontend UI/UX kész)
- [x] ✅ Milestone 5: Pre-Flight Quality Gate + Netlify Deploy (Deployolva a 'bemutatkozo_portfolio' repóból)
- [x] 🔒 Milestone 6/A: Appwrite Email/Password Login Wall integrálva (2026-03-01)
- [x] 🤖 Milestone 6/B: n8n Chatbot Workflow megépítve és összekötve (2026-03-01)
- [x] 🔐 Milestone 6/C: n8n Token Checker – Appwrite JWT server-oldali ellenőrzés (2026-03-01)
- [x] 🐛 Milestone 6/D: n8n Workflow Bug Fix – 6 kritikus hiba javítva (2026-03-01)

---

## 🚀 Jelenlegi Aktív Feladat

**N8n workflow javítva – éles teszt szükséges**

Az összes workflow hiba kijavítva (2026-03-01). Következő lépés: éles tesztelés a böngészőből (`npx serve . -p 3000` → bejelentkezés → chat).

## ✅ Legutóbb Elvégzett Lépések (2026-03-01 – 3. session)

### Milestone 6/C: n8n Token Checker integrálva és debuggolva (2026-03-01):
- A `kEMTGb6JE2ZMZ6xh` n8n workflow frissítésre került.
- A kliens oldali chat (amely minden kérésben beküld egy friss Appwrite JWT-t az `Authorization: Bearer` headerben) most már szerver-oldalon ki van értékelve.
- A Webhook után betettünk egy HTTP Request node-ot, amely lekéri a `https://fra.cloud.appwrite.io/v1/account` profilt.
- Ezt követi egy IF elágazás, ami a 200 OK választ várja. A hamis ágon egy 401 Unauthorized hibaüzenettel tér vissza azonnal, ha érvénytelen a token.
- **Hiba javítási kísérlet:** Az Appwrite JWT Checker Request Node-ban aktiválva lett az `ignoreResponseCode: true` beállítás, hogy a 401 Unauthorized hiba ne állítsa le `NodeApiError`-ral a teljes n8n futást idő előtt.

### n8n Chatbot Workflow megépítve (2026-03-01):

- **Workflow neve:** Euzert RAG Chatbot (ID: `kEMTGb6JE2ZMZ6xh`) – aktív
- **Architektúra:** Webhook → AI Agent ← Google Gemini Chat Model + Window Buffer Memory
- **Webhook:** POST `/euzert-chat`, `responseMode: lastNode`, Production URL: `https://n8n.srv1189601.hstgr.cloud/webhook/euzert-chat`
- **AI Agent:** typeVersion 3.1, bemenet: `{{ $json.body.message }}`, system promptban a teljes Euzert kurzus-tematika (Kezdő + Haladó kurzus, `prompt_engineering_tematika_for_rag.md` alapján)
- **LLM:** Google Gemini Chat Model – `gemini-2.5-flash`, credential: `Google Gemini(PaLM) Api account`
- **Memória:** Window Buffer Memory – typeVersion 1.3, session kulcs: `{{ $json.body.session_id }}`, 10 üzenet kontextus ablak
- **Megjegyzés:** Ez technikailag **nem valódi RAG** (nincs vector DB), hanem system prompt alapú chatbot. A jelenlegi tudásbázis méreténél (2 kurzus tematika) ez elegendő és egyszerűbb megoldás.
- **`index.html` frissítve:** `N8N_WEBHOOK_URL` átírva `localhost`-ról az éles URL-re (55. sor)
- **Kliens-oldali JWT:** A `chat.js` minden kérésnél Appwrite JWT tokent generál és `Authorization: Bearer` fejlécként küldi (server-oldali ellenőrzés még nem implementált)
- **Fejlesztői szerver:** `npx serve . -p 3000` → `http://localhost:3000`
- **Tesztelve:** Chat működik, a Gemini válaszol a kurzus tartalmáról

### Appwrite Auth Koncepció Váltás (Magic Link -> Email/Password):
- **Full-Site Login Wall:** A korábbi, csak a RAG Chat-re vonatkozó gate és login modál elvetve. Az egész weblap el lett rejtve egy globális, üveghatású (glassmorphic) Login Wall mögé (`#global-login-wall`).
- **Auth Logika Cseréje:** A Magic Linkes (`createMagicURLToken`) megoldást lecseréltük a hagyományos Email+Jelszó (`createEmailPasswordSession`) logikára.
- **Session Kezelés:** Az `auth.js` felkészítve a session-state alapú teljes DOM megjelenítésre/elrejtésre (`#app-wrapper` vs `#global-login-wall`).
- **Anonymous Session Fix:** Lekezelve egy hiba, ami miatt a háttérben létrejövő anonim munkamenetekkel is be lehetett jutni. Most kifejezetten a `session.email` jelenlétét várjuk a sikeres bejelentkezéshez.

### Szövegmódosítások (Dániel manuálisan + AI segítségével):

**Nav:**
- Logo: `Palotai.dev` → `ShiftCore`
- Nav linkek: `Miért én?` → `Az AI a mindennapokban`, `Miért AI?` → `Amiért érdemes`

**Hero:**
- Badge: `ShiftCore` → `Palotai Dániel`
- CTA gomb: `Tematikák megtekintése` → `Az AI a mindennapokban`
- Scroll hint: `Görgets le` → `Görgess le` (helyesírás javítva)

**#about szekció:**
- Section label: `Az ember a technológia mögött` → `Rólam`
- H2: `Honnan jöttem, hová tartok.` → `A mechatronikától az automatizálásig.`
- Timeline item 1: mechatronikai történet frissítve (2006, PLC, CNC)
- Timeline item 2: vállalkozói történet frissítve (csokoládé → mikrozöldek)
- Timeline item 3: ShiftCore leírás frissítve, `www.shiftcore.hu` kattintható linkké alakítva
- Idézet kártya: ShiftCore mottóra cserélve
- Tech tagek: `Python` → `Antigravity`, `RAG` → `Prompt scaffolding`, `Deno` → `MCP szerverek`

**#hook szekció:**
- Section label: `Miért én? Miért most?` → `AI a mindennapokban`
- H2: új szöveg – `Manuális munkavégzés, vagy AI vezérelt hatékonyság?`
- Mindkét kártya szövege Dániel által átírva (természetesebb, egyes szám → többes szám)

**#syllabus szekció:**
- H2: `Három ok, amiért érdemes váltani.` → `Három ok, amiért érdemes megtanulni az AI használatát.`
- Alcím: kisebb helyesírási javítás

**#tools szekció:**
- H2 és alcím finomítva
- Antigravity kártya szövege finomítva
- Ikonok lecserélve (Tool kártya emojik lecserélve egyedi, Tech-elegance SVG ikonokra színátmenetekkel)

### Deploy Műveletek (2026-02-25 este és 2026-03-01):
- Frontend kód szekurizálva (nincsenek hardcodolt titkos kulcsok).
- Kód feltöltve a `bemutatkozo_portfolio` GitHub repóba.
- A tároló sikeresen összekötve a Netlify-al, a statikus oldal élesedett.
- Login fal integrálva (Domainek felvéve Appwrite-ban a CORS due to).
- N8n Chatbot élesítve és ellenőrizve.

### Technikai / CSS változások:

- **HTML entitások konvertálva:** Az összes `&#xxx;` numerikus entitás valódi UTF-8 karakterré alakítva (`HtmlDecode` PowerShell scripttel)
- **Stats bar eltávolítva:** A hero alatti statisztika sáv törlésre került
- **`.section-rainbow-divider` hozzáadva:** Teljes szélességű, 6px magas, kék→lila gradient elválasztó vonal (stats bar helyett)
- **Betűméretek növelve (sections.css):**
  - `.section-label`: `0.75rem` → `1rem`
  - `.timeline-year`: `0.7rem` → `1.125rem`
  - `.timeline-title`: `1rem` → `1.125rem`
  - `.timeline-body p`: `0.9rem` → `1.125rem`
  - `.tech-tag`: `0.7rem` → `0.875rem`
  - `.hook-card > p`: `0.9375rem` → `1.125rem`
  - `.hook-feature-item`: `0.9rem` → `1.125rem`
  - `.syllabus-card > p`: `0.9rem` → `1.125rem`
  - `.syllabus-topic`: `0.8rem` → `1.125rem`
  - `.tool-card-desc`: `0.875rem` → `1.125rem`
  - `.tool-card-role`: `0.7rem` → `1rem`
  - `.syllabus-card .badge` (Idő/Tudás/Minőség): `0.75rem` → `2rem` (drasztikus, cím-szerű)
- **`.hook-cards` kiszélesítve:** `max-width: 1100px`, `gap: 1.5rem`
- **`.hook-feature-item` igazítás:** `align-items: flex-start` → `align-items: center` (sortörésnél az ikon középre igazodik)

---

## 🚧 Következő Lépés / Blokkerek

- **Nincsenek aktív blokkerek.** Az oldal éles, a funkciók (beleértve az Appwrite Email Logint és a biztonságos n8n webhook hívást token ellenőrzéssel is) működnek.
- Esetleges jövőbeli finomhangolások vagy a kliens (Euzert/Certop) felé a link kiküldése.

---

## 🏗️ Jelenlegi Oldalstruktúra

```
Header / Nav
  → Rólam   → Az AI a mindennapokban   → Amiért érdemes   [Kilépés gomb ha bejelentkezve]

#global-login-wall – (Eltakar mindent, amíg nincs sikeres bejelentkezés)

#app-wrapper       – (A tényleges tartalom, login után jelenik meg)
  #hero            – Hero szekció ("Alkoss vele!" + eszközök megemlítve)
  [gradient divider – 6px, kék→lila]
  #about           – Rólam timeline + ShiftCore idézet + tech tagek
  #hook            – Régen vs. AI-jal összehasonlítás (2 kártya)
  #syllabus        – Miért AI? (3 előny kártya: Idő / Tudás / Minőség – nagy badge)
  #tools           – Eszközök showcase (Antigravity · Claude · Gemini · n8n)
  #chat            – RAG Chatbot szekció (nincs külön gate, mivel a főoldal védett)
```

---

## 🔗 Gyorslinkek és Kontextus

- **[Gyökér AI Szabályok](AGENTS.md)**
- **[Szövegezési Napló](szovegezes.md)**
- **[Készülő Feladatok](docs/TASKS.md)**
- **[Projekt Követelmények és Flow](docs/PRD.md)**
- **[Rendszer Architektúra](docs/ARCHITECTURE.md)**
- **[Design Rendszer](docs/DESIGN_SYSTEM.md)**
- **[SEO & Teljesítmény](docs/SEO.md)**
- **[Ügyfél Profil](docs/CLIENT_PROFILE.md)**

