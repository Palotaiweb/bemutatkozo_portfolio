# DESIGN SYSTEM – Palotai Dániel AI Oktatói Portfólió

> **Az Anti-AI-Slop Irányelvek:**
> ❌ **TILOS**: Generikus lila-kék-rózsaszín gradiens háttér egész oldalon.
> ❌ **TILOS**: Túlzottan lekerekített kártyák (border-radius: 9999px az egész UI-n).
> ❌ **TILOS**: Három egymás melletti, teljesen egyforma „feature kártya" sablon.
> ❌ **TILOS**: Jumbotron-szerű stock photo vagy placeholder illusztráció.
>
> ✅ **KÖTELEZŐ**: Tech-elegance – prémium sötét paletta, pontosan meghatározott neon akcent.
> ✅ **KÖTELEZŐ**: Szándékos whitespace és aszimmetria (nem szimmetrikus grid minden szekcióban).
> ✅ **KÖTELEZŐ**: Glassmorphism kártyák – `backdrop-filter: blur()` + enyhe border (`rgba(255,255,255,0.1)`).

---

## Design Döntések Indoklása

- **Megrendelő profil:** Lásd `docs/CLIENT_PROFILE.md` – Palotai Dániel, ShiftCore alapítója, AI oktató
- **Hangulat (Mood):** Magabiztos, prémium, technológiai élvonal – de nem hideg vagy robotikus
- **Miért ez a stílus:** A ShiftCore meglévő arculata (neon zöld/kék) és a tech-elegance iparági elvárás indokolja a dark mode + neon akcent kombinációt. A glassmorphism emberi melegséget visz a high-tech esztétikába. Az `Outfit` font dinamikus és modern, de nem generikus (pl. nem Poppins).

---

## 🎨 Színpaletta (CSS Custom Properties)

| CSS Token | HEX Kód | Használat |
|-----------|---------|-----------|
| `--color-bg` | `#0f172a` | Fő háttérszín (mély tengerészkék) |
| `--color-surface` | `#1e293b` | Kártyák, modálpanelek alap háttere |
| `--color-surface-glass` | `rgba(30,41,59,0.6)` | Glassmorphism kártyák + backdrop-filter blur(12px) |
| `--color-primary` | `#0ea5e9` | CTA gombok, kiemelt linkek, aktív state |
| `--color-primary-glow` | `rgba(14,165,233,0.25)` | Glow effekt (box-shadow animációkhoz) |
| `--color-accent` | `#8b5cf6` | Másodlagos akkord, badge-ek, szekcióhatároló vonal |
| `--color-accent-glow` | `rgba(139,92,246,0.2)` | Lila glow effektekhez |
| `--color-text` | `#f1f5f9` | Alap szöveg, headingek |
| `--color-text-muted` | `#94a3b8` | Másodlagos leírások, placeholder szövegek |
| `--color-border` | `rgba(255,255,255,0.08)` | Kártyák, szeparátorok finom kerete |
| `--color-success` | `#10b981` | Sikeres login, zöld visszajelzések |
| `--color-error` | `#ef4444` | Hibaüzenetek, validációs hibák |

---

## 📝 Tipográfia

- **Fő Címsorok (h1, h2, h3):** `Outfit` – font-weight: 700/800 (Google Fonts)
  - h1: `clamp(2.5rem, 5vw, 4rem)` – Hero headline
  - h2: `clamp(1.75rem, 3vw, 2.5rem)` – Szekció fejlécek
  - h3: `1.25rem` – Alkártyák, modulcímek
- **Folyó Szöveg (body, p, li):** `Inter` – font-weight: 400/500 (Google Fonts)
  - Alap méret: `1rem` (16px), line-height: `1.7`
- **Gombok és Címkék (button, badge):** `Inter` – font-weight: 600, letter-spacing: 0.02em
- **Kódblokk / Tech tartalom:** `JetBrains Mono` vagy `Fira Code` – csak a demó szekcióban

---

## 📐 Spacing & Layout

- **Border Radius (Kártyák):** `12px` – modern, de nem játékos
- **Border Radius (Gombok):** `8px` – éles, professzionális
- **Border Radius (Modál/Overlay):** `16px`
- **Max Content Width:** `1200px` (center aligned, `margin: 0 auto`)
- **Section Padding:** `padding: clamp(4rem, 8vw, 8rem) 0`
- **Container Padding (oldalirány):** `padding: 0 clamp(1rem, 5vw, 2rem)`
- **Glassmorphism recipe:** `background: var(--color-surface-glass); backdrop-filter: blur(12px); border: 1px solid var(--color-border);`

---

## 🧩 Komponens Állapotok (Kitchen Sink kötelező elemei)

**Gombok (Buttons):**
- **Primary (CTA):**
  ```css
  background: var(--color-primary);
  color: white;
  box-shadow: 0 0 20px var(--color-primary-glow);
  transition: box-shadow 0.3s, transform 0.2s;
  /* hover: */ box-shadow: 0 0 35px var(--color-primary-glow); transform: translateY(-2px);
  ```
- **Ghost/Outline:**
  ```css
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  background: transparent;
  /* hover: */ background: rgba(14,165,233,0.1);
  ```
- **Disabled:** `opacity: 0.45; cursor: not-allowed; pointer-events: none;`

**Input Mezők (email input a login modálban):**
- **Default:** `border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); focus: border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-glow);`
- **Hiba (Error):** `border-color: var(--color-error); box-shadow: 0 0 0 3px rgba(239,68,68,0.2);`

**Kártyák (Feature card / Demo panel):**
```css
background: var(--color-surface-glass);
backdrop-filter: blur(12px);
border: 1px solid var(--color-border);
border-radius: 12px;
padding: 2rem;
```

**Badge / Chip (Modul jelölők):**
```css
background: var(--color-accent-glow);
color: var(--color-accent);
border: 1px solid var(--color-accent);
border-radius: 4px;
font-size: 0.75rem;
font-weight: 600;
padding: 2px 10px;
```

---

## 📱 Reszponzivitás (Breakpoints)

- **Mobile (< 640px):** 1 oszlopos layout, hamburger menü (ha van nav), min. 44×44px érintési terület, stack-elt hero szöveg
- **Tablet (640px – 1024px):** 2 oszlopos grid a feature kártyáknál, adaptív spacing
- **Desktop (> 1024px):** Teljes layout, aszimmetrikus szekciók (pl. 60/40 split)

---

## 🎬 Animációk (Micro-interaction szabályok)

- **Hero háttér:** Finom részecske-effekt VAGY kódgépelő animáció (`typing effect`) – NE legyen egyszerre mindkettő
- **Scroll megjelenések:** `@keyframes fadeInUp` – elemek alulról fade-in megjelenése viewport-ba éréskor (`Intersection Observer`)
- **Gomb hover:** `transform: translateY(-2px)` + glow erősítés (0.2s ease)
- **Logo / név megjelenés:** 1 másodperces slide-in animáció oldalbetöltéskor
- **Animáció szabály:** `prefers-reduced-motion` media query esetén minden animáció ki van kapcsolva
