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
- [ ] 🤖 Milestone 6: Appwrite DB + n8n Workflow integráció (KÖVETKEZŐ LÉPÉS)

---

## 🚀 Jelenlegi Aktív Feladat

**Következő lépés a kódoló AI számára (Következő Session):**
1. Appwrite projekt konfigurálása (adatbázis és séma) és `projectId` beállítása.
2. n8n webhook összeállítása a generálásokhoz (és a webhook URL beállítása a frontenden).
3. Az integráció tesztelése a bejelentkezett felhasználókkal és a RAG chatbot "életre keltése".

---

## ✅ Legutóbb Elvégzett Lépések (2026-02-25 délután)

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

### Deploy Műveletek (2026-02-25 este):
- Frontend kód szekurizálva (nincsenek hardcodolt titkos kulcsok).
- Kód feltöltve a `bemutatkozo_portfolio` GitHub repóba.
- A tároló sikeresen összekötve a Netlify-al, a statikus oldal élesedett.

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

- **Blokkerek a Milestone 6-hoz (n8n & Appwrite Backend):**
  - *Blocker 1:* Az Appwrite `projectId` még placeholder (`REPLACE_WITH_YOUR_PROJECT_ID`) a HTML-ben.
  - *Blocker 2:* `N8N_WEBHOOK_URL` üres – a RAG flow beérkező webhookja még kialakításra vár az n8n szerveren.

---

## 🏗️ Jelenlegi Oldalstruktúra

```
Header / Nav
  → Rólam   → Az AI a mindennapokban   → Amiért érdemes   [Kilépés gomb ha bejelentkezve]

#hero      – Hero szekció ("Alkoss vele!" + eszközök megemlítve)
[gradient divider – 6px, kék→lila]
#about     – Rólam timeline + ShiftCore idézet + tech tagek
#hook      – Régen vs. AI-jal összehasonlítás (2 kártya)
#syllabus  – Miért AI? (3 előny kártya: Idő / Tudás / Minőség – nagy badge)
#tools     – Eszközök showcase (Antigravity · Claude · Gemini · n8n)
#chat      – RAG Chatbot szekció (login gate-tel védve)
Modal      – Appwrite Magic Link login
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

