# 🔍 SEO & Teljesítmény – Palotai Dániel AI Oktatói Portfólió

> **Fontos kontextus:** Ez az oldal szándékosan `noindex`-elt – nem szeretnénk keresőmotoros megtalálhatóságot (LLM demo védelem). Az alábbi SEO szabályok az Open Graph social sharing és a teljesítmény szempontjából relevánsak.

---

## 1. Meta Elemek (index.html `<head>`)

```html
<title>Palotai Dániel – AI Felnőttoktatás | ShiftCore</title>
<meta name="description" content="Gyakorlati AI oktatás felnőttképző intézményeknek. Palotai Dániel, ShiftCore – ahol az AI valódi eszköz, nem buzzword.">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="https://[projekt-neve].netlify.app/">
```

## 2. Open Graph Tagek (közösségi megosztáshoz)

```html
<meta property="og:title" content="Palotai Dániel – AI Felnőttoktatás">
<meta property="og:description" content="Nem ChatGPT-másolgatás. Valódi, gyakorlati AI tréning felnőttképzőknek.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://[projekt-neve].netlify.app/">
<meta property="og:image" content="https://[projekt-neve].netlify.app/assets/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="hu_HU">
```

**OG Kép követelmények:** 1200×630px, sötét háttér, Dániel neve + „AI Felnőttoktatás" szöveg + ShiftCore logo, PNG formátum.

---

## 3. Core Web Vitals Célok

| Metrika | Cél | Hogyan érjük el |
|---------|-----|-----------------|
| **LCP** (Largest Contentful Paint) | < 2.5 mp | Hero szöveg CSS-sel renderelt (nem kép); fontok `preload` |
| **FID / INP** | < 100 ms | Vanilla JS, nincs nehéz framework boot |
| **CLS** | < 0.1 | Képek explicit `width`/`height` attribútumokkal |

---

## 4. Teljesítmény Szabályok

- **Google Fonts betöltés:**
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  ```
- **Képek:** Minden `<img>` tagnek kötelező `width`, `height` és `loading="lazy"` attribútum (a Hero above-the-fold képre `loading="eager"`).
- **CSS:** Kritikus CSS inline a `<head>`-ben (alap layout + Hero), a többi CSS `<link>` fájlban.
- **JS:** `<script>` tagek `defer` attribútummal – soha ne blokkolják a HTML parsert.
- **Supabase SDK:** Csak a szükséges modulok importálva (`@supabase/supabase-js` Auth + Functions), nem a teljes csomag.

---

## 5. Netlify Headers (`netlify.toml`)

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Robots-Tag = "noindex, nofollow"
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer"

# Cache statikus assets 1 évre
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=86400"
```

---

## 6. Lighthouse Ellenőrzési Checklist (Pre-Flight)

A kódoló AI a Milestone 4-ben futtatja ezeket:

- [ ] Performance score ≥ 90
- [ ] `<title>` és `<meta description>` jelen van
- [ ] OG image elérhető és megfelelő méretű (1200×630px)
- [ ] Minden `<img>` rendelkezik `alt` attribútummal
- [ ] `noindex` meta tag és `X-Robots-Tag` header beállítva
- [ ] Mobil nézet ok (375px, 768px breakpointokon tesztelve)
- [ ] Supabase `ANON_KEY` NEM jelenik meg a JS bundle-ban (Edge Function kezeli az API kulcsot)
