# 🏗️ ARCHITECTURE – Palotai Dániel AI Oktatói Portfólió
## ⚠️ FRISSÍTVE: Supabase → Appwrite (2026-02-23)

## Tech Stack

| Réteg | Technológia | Indoklás |
|-------|------------|----------|
| **Frontend** | HTML5 + Vanilla CSS + Vanilla JS | Single Page, nincs szükség frameworkre; a kézműves kód impresszívebb; nulla build-idő |
| **Hosting** | Netlify (ingyenes tier) | Gyors CD/CI, egyszerű deploy, `*.netlify.app` subdomain elég |
| **Auth** | **Appwrite Cloud Auth** (Magic URL / Email OTP) | Supabase free tier megtelt → Appwrite ingyenes; hasonló Magic Link funkció |
| **Adatbázis** | **Appwrite Database** (Documents/Collections) | Ingyenes tier: 75K kérés/nap, 2 GB storage; RLS-t Appwrite Permissions váltja |
| **LLM hívás** | **Netlify Functions** (Node.js) | Appwrite Functions limitált; Netlify Function-ök már elérhetők a hostingon; free 125K exec/hó |
| **LLM modell** | OpenAI GPT-4o vagy Claude (döntés deploy előtt) | Erős reasoning, gyors válasz |
| **Fontok** | Google Fonts CDN (`Outfit`, `Inter`) | Ingyenes, gyors, CDN cached |
| **Animációk** | Vanilla JS + CSS Animations | Nincs GreenSock vagy GSAP szükség; CSS-first animációs politika |

---

## Sitemap / Oldalstruktúra

Ez egy **egyoldalas (SPA-szerű) statikus HTML** oldal – nincs routing, minden szekció egymás alatt található, smooth scroll navigációval.

```
index.html
│
├── #hero          → Hero szekció (headline, subheadline, CTA, animáció)
├── #about         → Rólam (életrajz, személyes story)
├── #hook          → Felnőttképzési fókusz (miért Dániel az igazi AI tréner)
├── #syllabus      → AI Oktatási Tematikák (3 modul)
├── #demo          → Interaktív AI Demo (login-gated szekció)
│   └── login modál overlay (Appwrite Magic URL auth)
└── (footer)
```

---

## Fájlrendszer struktúra (kész projekt)

```
euzert-certop-landing/
├── index.html                   # Egyetlen HTML fájl, összes szekció
├── css/
│   ├── main.css                 # CSS custom properties (design tokenek), alap layout
│   ├── components.css           # Gombok, kártyák, modál, badge-ek
│   ├── animations.css           # @keyframes, transitions
│   ├── hero.css                 # Hero szekció styles
│   └── sections.css             # About, Hook, Syllabus section styles
├── js/
│   ├── main.js                  # Scroll observer, smooth scroll, általános UI
│   ├── hero.js                  # Particle canvas + nav scroll
│   ├── auth.js                  # Appwrite Auth logika (Magic URL, session check)
│   └── demo.js                  # Demo szekció logika (témaválasztó, Netlify Function hívás)
├── netlify/
│   └── functions/
│       └── generate-demo.mjs    # Node.js serverless function – LLM API hívás
├── assets/
│   └── (opcionális: logo.svg, og-image.png)
├── netlify.toml                 # Netlify konfig: noindex header, function directory
├── .env.example                 # Dokumentálás: szükséges env változók listája
└── design-system.html           # Kitchen Sink – vizuális validáció (nem deploy-olandó)
```

---

## Appwrite Adatbázis Séma

Appwrite-ban nem SQL táblákat, hanem **DB → Collection → Document** struktúrát használunk.

### Database: `portfolio-db`

#### Collection: `profiles`
| Attribútum | Típus | Kötelező | Leírás |
|---|---|---|---|
| `userId` | String | ✅ | Appwrite Auth user ID |
| `email` | String | ✅ | Meghívott email cím |
| `role` | Enum [`euzert`, `certop`] | ✅ | Melyik képzőhelytől érkezett |
| `createdAt` | DateTime | ✅ | Auto |

**Permissions:** Read: `user:{{userId}}` – Mindenki csak a saját profilját látja.

#### Collection: `demo_logs` (opcionális)
| Attribútum | Típus | Kötelező | Leírás |
|---|---|---|---|
| `userId` | String | ✅ | Ki futtatta a demót |
| `topic` | String | ✅ | Kiválasztott téma |
| `createdAt` | DateTime | ✅ | Auto |

**Permissions:** Create/Read: `user:{{userId}}`

---

## Auth Folyamat (Appwrite Magic URL)

1. Felhasználó beírja emailjét a login modálba
2. `account.createMagicURLToken(userId, email, redirectUrl)` hívás
3. Appwrite emailt küld a Magic URL-lel
4. Felhasználó a linkre kattint → visszakerül az oldalra `?userId=...&secret=...` paraméterekkel
5. `account.updateMagicURLSession(userId, secret)` → session létrejön
6. Session token elmentve → demo szekció feloldva

---

## Netlify Function – LLM hívás

```
netlify/functions/generate-demo.mjs
```

**Logika:**
1. Fogad egy `Authorization: Bearer <appwriteJWT>` headert
2. Verifikálja a JWT-t az Appwrite SDK-val (`users.get()` vagy JWT verify)
3. Ha érvényes → hívja az LLM API-t (OpenAI / Claude) a kiválasztott témával
4. Ha érvénytelen → `401 Unauthorized`
5. Ha LLM timeout → `504`, max 2 retry
6. Visszaad egy strukturált JSON választ (markdown szöveg a demóhoz)

**Netlify env változók** (Netlify dashboardon beállítandó, soha nem commitolva):
```
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=xxx
APPWRITE_API_KEY=xxx        # Server-side only, soha nem frontend!
LLM_API_KEY=xxx             # OpenAI sk- vagy Anthropic key
LLM_MODEL=gpt-4o            # vagy claude-3-5-sonnet-20241022
```

**Frontend env** (HTML-ből window.ENV közvetítésén keresztül):
```
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=xxx     # Publikus, biztonságos a frontenden
```

---

## Frontend ↔ Backend Kommunikáció

```
[Felhasználó böngészője]
       │
       │ 1. Appwrite JS SDK → Magic URL kérés (account.createMagicURLToken)
       ▼
[Appwrite Auth Cloud]
       │
       │ 2. Magic URL email elküldve; felhasználó visszatér az oldalra
       ▼
[Frontend (js/auth.js)]
       │  account.updateMagicURLSession(userId, secret)
       │
       │ 3. fetch('/.netlify/functions/generate-demo', {
       │       headers: { Authorization: 'Bearer <appwriteJWT>' }
       │    })
       ▼
[Netlify Function: generate-demo.mjs]
       │
       │ 4. JWT validáció (Appwrite API-val) + LLM API hívás
       ▼
[LLM API (OpenAI / Claude)]
       │
       │ 5. Válasz visszaküldve JSON-ban
       ▼
[Frontend (js/demo.js)] → Megjelenítés a demo panelben
```
