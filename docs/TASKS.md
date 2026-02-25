# ✅ TASKS – Palotai Dániel AI Oktatói Portfólió
*Izolált, kis implementációs lépések a kódoló AI számára. Mindig egy milestoneot csinálj egyszerre!*

---

## 🎨 Milestone 0: Living Style Guide – Vizuális Validáció (KÖTELEZŐ ELSŐ LÉPÉS)

> **Miért van ez itt?** Mielőtt bármilyen szekciót kódolnál, Dániel vizuálisan jóvá kell hagyja a design rendszert. Ez megakadályozza a felesleges újrakódolást.

**Feladatok:**
- [ ] Hozd létre a projekt alap fájlstruktúráját (`index.html`, `css/main.css`, `css/components.css`, `css/animations.css`, `js/main.js`)
- [ ] Implementáld a `docs/DESIGN_SYSTEM.md` CSS custom property rendszerét a `css/main.css`-ben
- [ ] Töltsd be a Google Fonts-ot (`Outfit` + `Inter`) a HTML `<head>`-be `preconnect` linkekkel
- [ ] Hozz létre egy **`design-system.html`** fájlt (izolált Kitchen Sink oldal), amely tartalmazza:
  - Teljes színpaletta swatchek (minden `--color-*` token vizualizálva)
  - Tipográfia skála (h1, h2, h3, body, muted szöveg)
  - Gomb állapotok: Primary, Ghost, Disabled
  - Input mező állapotok: Default, Focus, Error
  - Glassmorphism kártya példa
  - Badge / Chip komponens
  - A `fadeInUp` animáció demonstrációja
- [ ] **Állj meg, és jelezd Dánielnek, hogy nézze meg a `design-system.html`-t!**

---

## 🚀 Milestone 1: Hero szekció + Alap HTML struktúra

*Csak azután kezdd el, ha a 0. Milestone-t Dániel jóváhagyta!*

- [ ] `index.html` alap HTML5 struktúra (DOCTYPE, meta tagek a `docs/SEO.md` alapján, Google Fonts, CSS és JS linkek)
- [ ] `netlify.toml` elkészítése a `docs/SEO.md` Netlify headers szekciója alapján
- [ ] `#hero` szekció kódolása:
  - Headline: *„Ne csak tanulj az AI-ról. Építs vele."*
  - Subheadline: *„Ezt az oldalt is egy AI ügynök építette – az én iránymutatásaim alapján."*
  - Két CTA gomb: „Tematikák megtekintése" (belső scroll) + „Demo indítása" (→ `#demo` anker)
  - Háttér animáció: CSS `typing effect` vagy `particle-like` CSS + JS kombó (NINCS külső lib!)
- [ ] Smooth scroll JS implementálása (`js/main.js`)
- [ ] Mobil reszponzivitás: Hero stack-elés 640px alatt

---

## 👤 Milestone 2: Rólam + Képzőhely Fókusz szekciók

- [ ] `#about` szekció kódolása (életrajz szövege a `docs/PRD.md` 2. fejezetéből, glassmorphism kártya layout)
  - Tartalom: mechatronika → csokoládé → mikrozöldek → AI (timeline stílusban vagy narráció kártyákon)
- [ ] `#hook` szekció kódolása: „Miért én? Miért most?" – felnőttképzési fókuszú üzenet
  - Euzert irány: AI mint flow-alapú, személyre szabott tréner-asszisztens
  - Certop irány: AI oktatás a certop képzési résztvevőinek (NEM audit!)
  - Két különálló kártya vagy tab layout a két képzőhelynek
- [ ] `#syllabus` szekció: 3 modul kártyák (a `docs/PRD.md` E szekciójából):
  - Modul 1: Túl a ChatGPT-n (Prompt architektúrák és RAG)
  - Modul 2: AI a mindennapokban (Automatizált workflow-k)
  - Modul 3: AI-asszisztált tananyagkészítés és tréner-asszisztencia
- [ ] Intersection Observer alapú `fadeInUp` animáció bekötése (`js/main.js`)

---

## 🤖 Milestone 3: Interaktív AI Demo szekció + Supabase Auth

- [ ] Supabase JS SDK betöltése (csak auth + functions modulok)
- [ ] `.env.example` fájl dokumentálása:
  ```
  SUPABASE_URL=https://your-project.supabase.co
  SUPABASE_ANON_KEY=your-anon-key
  ```
- [ ] `js/auth.js` – Supabase Magic Link logika:
  - Login modál megjelenítése
  - Email beküldése → Magic Link kérés
  - Session kezelése (callback URL, session check oldalbetöltéskor)
  - Session lejárat kezelése (modál újra megnyílik)
  - Nem meghívott felhasználó kezelése (UI visszajelzés)
- [ ] `js/demo.js` – Demo szekció logika:
  - Témák lenyíló lista:
    1. „AI-asszisztált tananyag tervezés 10 perc alatt"
    2. „Prompt-tervezés trénereknek"
    3. „AI mint személyre szabott tanulási asszisztens"
  - Gomb → fetch hívás a Supabase Edge Functionhöz
  - Betöltés animáció (skeleton loader vagy spinner)
  - Eredmény megjelenítése markdown panelben
  - LLM timeout kezelése (barátságos hibaüzenet)
- [ ] Supabase Edge Function vázlat (`supabase/functions/generate-demo/index.ts`):
  - Token validáció
  - LLM API hívás (prompt engineering a témára optimalizálva)
  - JSON válasz strukturálása
- [ ] `#demo` szekció HTML kódolása (glassmorphism panel, témaválasztó, eredmény panel)
- [ ] Supabase adatbázis séma lefuttatása (lásd `docs/ARCHITECTURE.md`)

---

## 🔧 Milestone 4: Csiszolás + Teljesítmény

- [ ] Lighthouse audit futtatása: cél ≥ 90 Performance score
- [ ] `prefers-reduced-motion` media query bekötése – animációk kikapcsolása
- [ ] OG image (`assets/og-image.png`) létrehozása: 1200×630px, dark háttér, Dániel neve + ShiftCore
- [ ] Minden `<img>` tag `alt`, `width`, `height`, `loading="lazy"` attribútumok ellenőrzése
- [ ] `<title>` és `<meta description>` meglétének ellenőrzése
- [ ] Mobil tesztelés: 375px (iPhone SE) + 768px (tablet) breakpointokon
- [ ] Supabase RLS policy-k ellenőrzése (minden tábla védett?)
- [ ] API kulcs nem jelenik meg a frontend JS-ben (keresés a bundle-ban)

---

## ✈️ Milestone 5 (Végső): Pre-Flight Quality Gate

- [ ] `npm run build` vagy statikus validáció (HTML validator)
- [ ] `X-Robots-Tag: noindex` header aktív (Netlify deploy után ellenőrizd!)
- [ ] Happy Path tesztelés:
  1. Oldal betölt → Hero látható
  2. Demo gomb → Login modál jelenik meg
  3. Magic Link → Bejelentkezés → Demo elérhető
  4. Téma kiválasztása → LLM válasz megjelenik
- [ ] Netlify deploy sikeres (no build errors)
- [ ] **Jelentkezz Dánielnek: a projekt kész!**
