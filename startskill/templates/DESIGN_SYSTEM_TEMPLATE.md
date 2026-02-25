# DESIGN SYSTEM - [Projekt Neve]

> **Az Anti-AI-Slop Irányelvek:**
> A modern webdesign nem jelent egyet az "AI-generált" kinézettel. 
> ❌ **TILOS**: Örökös lila-kék-rózsaszín gradiens háttér.
> ❌ **TILOS**: Túlzottan lekerekített kártyák (border-radius: 9999px az egész UI-n).
> ❌ **TILOS**: Három egymás melletti teljesen egyforma "feature kártya" sablonként minden oldalra.
> ❌ **TILOS**: Inter/Poppins betűtípus használata alapértelmezettként anélkül, hogy megvizsgálnánk a megrendelő brandjét.
> 
> ✅ **KÖTELEZŐ**: A megrendelő iparágához illő, egyedi színpaletta és tipográfia.
> ✅ **KÖTELEZŐ**: Szándékos whitespace és aszimmetria, ahol indokolt.

## Design Döntések Indoklása

- **Megrendelő profil:** [Hivatkozás a CLIENT_PROFILE.md-re]
- **Hangulat (Mood):** [2-3 jelző, ami leírja az elvárt érzetet, pl. "megbízható, modern, minimalista"]
- **Miért ez a stílus:** [Rövid indoklás, hogy a fenti szempontok alapján miért ez a szín és betűtípus lett kiválasztva]

---

## 🎨 Színpaletta (Tailwind Token Mapping)

| Tailwind Token | HEX Kód | Használat |
|----------------|---------|-----------|
| `primary` | [#HEX] | Fő CTA gombok, primer kiemelések |
| `secondary` | [#HEX] | Másodlagos gombok, badges |
| `background` | [#HEX] | Fő háttérszín (Base) |
| `surface` | [#HEX] | Kártyák, modálpanelek (Surface) |
| `text-primary` | [#HEX] | Címsorok, alap szöveg |
| `text-muted` | [#HEX] | Másodlagos leírások, placeholder szövegek |
| `success` | [#HEX] | Sikeres mentés, zöld pipák |
| `error` | [#HEX] | Törlés, hibaüzenetek |

---

## 📝 Tipográfia

- **Fő Címsorok (h1, h2, h3):** [Betűtípus Neve] (pl. *Outfit, DM Sans, Clash Display*)
- **Folyó Szöveg (body, p, span):** [Betűtípus Neve] (pl. *Inter, IBM Plex Sans, Roboto*)
- **Gombok és Címkék (button, badge):** [Betűtípus Neve] (gyakran egyezik a Fő Címsorokkal, de font-weight: 500/600)

## 📐 Spacing & Layout

- **Border Radius (Alap):** [pl. 0px (brutalism), 4px (éles), 8px (modern), 12px+ (játékos)]
- **Max Content Width:** [pl. 1200px, 1440px]

---

## 🧩 Komponens Állapotok (Kötelező a Kitchen Sinkhez)

**Gombok (Buttons):**
- **Default:** `bg-primary text-white hover:opacity-90 transition-all`
- **Ghost/Outline:** `border border-primary text-primary hover:bg-primary/10`
- **Disabled:** `opacity-50 cursor-not-allowed`

**Input Mezők:**
- **Default:** `border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent`
- **Hiba (Error):** `border-error focus:ring-error text-error`

## 📱 Reszponzivitás (Breakpoints)

- **Mobile (< 640px):** [1 oszlopos layout, hamburger menü, minimum 44x44px touch area]
- **Tablet (640px - 1024px):** [Grid max 2 oszlopos, adaptív spacing]
- **Desktop (> 1024px):** [Teljes layout, sidebar navigation/top navbar]
