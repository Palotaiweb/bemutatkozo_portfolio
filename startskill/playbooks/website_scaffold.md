# 📚 Playbook: Weboldal (Website) Projekt Előkészítés
*Használd ezt a playbookot statikus, SSG (Static Site Generation), vagy alapvetően tartalom-központú, SEO fókuszú, frontend (pl. marketing) weboldalakhoz.*

## 1. Generáld le az Alapkörnyezetet
Hozd létre a projektkönyvtárban pontosan az alábbi fájlokat az alapsablonok (`startskill/templates/`) felhasználásával:
1. `AGENTS.md`
2. `PROJECT_MAP.md`
3. `docs/PRD.md` (Fókuszolj a célközönség bemutatására, a Call-To-Action [CTA]-kra, és a tartalmi blokkokra!)

## 2. Generáld le a Weboldal-Specifikus Dokumentumokat
A sablonokon túl kötelezően hozd létre a `docs/` mappában:

### `docs/CLIENT_PROFILE.md`
> A `startskill/templates/CLIENT_PROFILE_TEMPLATE.md` alapján készítsd el az Ügyfél-Megismerés (0. Fázis) válaszaiból és a weben végzett kutatásodból. Ebből fog származni a teljes UI hangulata és a célközönség meghatározása.

### `docs/DESIGN_SYSTEM.md`
> A `startskill/templates/DESIGN_SYSTEM_TEMPLATE.md` szigorú Anti-AI-Slop szabályai alapján készíts egy, a megrendelőhöz illeszkedő, teljesen egyedi, vizuális rendszert. Színek (Tailwind Token Mapping), tipográfia, és spacing.

### `docs/SEO.md` (Teljesítmény és Keresőoptimalizálás)
Ez a legfontosabb dokumentum weblap esetén! Definiáld:
- **Alap meta elemek:** Minden frontend oldalon legyen egyedi `<title>` (max 60 karakter) és `<meta description>` (max 155 karakter).
- **Open Graph (OG) Tagek:** Közösségi média megosztáshoz (`og:title`, `og:image`, stb).
- **Sitemap & Canonical URL:** Tartsuk be az alapszabályokat (minden oldal saját magára mutat - canonical).
- **Core Web Vitals Célok:** LCP (legnagyobb vizuális elem betöltése) < 2.5 másodperc. A képeket mindig a keretrendszer saját (optimalizált) image komponensével (pl. `next/image` vagy Astro `<Image />`) töltsük be inline `<img>` tagek helyett!

### `docs/ARCHITECTURE.md`
Tartalmazza a Tech Stacket (pl. Next.js, Astro), és definiáld a **Sitemap Fatérképet**: milyen oldalak lesznek (Főoldal, Rólunk, Szolgáltatások, Kapcsolat).

### `docs/TASKS.md`
Bontsd le a megvalósítást. A UI (megjelenés) mindenek felett prioritást élvez.

- **Milestone 1: Init & UI Validáció (KÖTELEZŐ):**
  - Inicializáld a projektet a megfelelő frameworkkel.
  - Implementáld a vizuális irányt a TailwindCSS beállításokkal (színek, fontok).
  - Építs egy izolált `/design-system` (Kitchen Sink) oldalt a `tasks.md`-n keresztül a kódolónak, amin bemutatja az *összes* gomb, tartalomblokk és tipográfiai elemet. Cél: Dani vizuális validációja a kódolás folytatása előtt.

- **Milestone 2: Főoldal (Landing Page):** A legfontosabb blokkok, Hero szekció, SEO alapok.
- **Milestone 3: Aloldalak & Routing:** Integráció.
- **Milestone 4: Csiszolás:** Lighthouse / Teljesítmény tesztek futtatása a kódolónak (PWA javaslatok, képek méretezése).
- **Milestone 5 (Végső): Pre-Flight Quality Gate:** Futtass le egy Build tesztet (`npm run build`), ellenőrizd a címsorok/meta tagek meglétét, és a reszponzivitást egy végső iterációként!

## 3. Finomhangold az `AGENTS.md` fájlt
Gondoskodj róla, hogy az `AGENTS.md` 🚫 **Soha** (Never) része tartalmazza:
- "Soha ne használj sima szabványos `<img>` taget külső, optimalizálatlan képekre, mindig használd a framework beépített képoptimalizálóját!"
- "Soha ne felejtsd le a `<title>` és `<meta description>` elemeket statikus/publikus oldalakról!"

Jelentkezz be Daninál, formálisan készre jelentve a weboldal "Scaffolding" fázisát!
