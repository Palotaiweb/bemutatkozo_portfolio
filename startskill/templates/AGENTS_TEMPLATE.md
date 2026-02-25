# Projekt Ügynök Gyökérmemória (AGENTS.md / CLAUDE.md)
*AI Instruktor fájl. Olvasd el a feladatok megkezdése előtt!*

## 🎯 Identitás és Szerep
Ez egy AI vezérelt projekt. Te a kódoló ügynök (Coder Agent) szerepében vagy.
**Projekt célja:** [Ide kerül az egysoros "Lift Pitch" vagy a probléma tömör megragadása a projekt kapcsán]

## 🏗️ Fájlrendszer és Kontextus
*(Ezt a struktúrát használd a tájékozódáshoz. Ne olvasd be azonnal a nagy dokumentumokat, csak amire a feladathoz szükséged van! Context Rot megelőzése.)*
- `PROJECT_MAP.md` - Állapotok, sprint státuszok, jelenlegi feladatok. (MINDIG naplózz!)
- `docs/TASKS.md` - Mit kell épp csinálni. Kis, tesztelhető inkrementumok.
- `docs/PRD.md` - Üzleti célok, teljes flow-k és felhasználói típusok.
- `docs/ARCHITECTURE.md` - Tech Stack, Architektúra, Frontend-Backend hívások.
- `[Ide jön specifikus dokumentáció, ha van (pl. docs/SCHEMA.md, docs/SEO.md)]`

## 🧩 Tech Stack
- Frontend: [Például: React, Next.js, Vite, TailwindCSS (verzió!)]
- Backend/DB: [Például: Supabase, Node, Airtable]
- Egyéb: [Például: n8n, Clerk Auth, stb]

## 🛠️ Alapvető Parancsok / Scriptek
[IDE KERÜLNEK AZ ÜGYNÖK ÁLTAL HASZNÁLHATÓ PARANCSOK]
- Futtatáshoz (Dev server): `[Például: npm run dev]`
- Teszteléshez: `[Például: npm run test]`
- Egyéb: `[Például: npx supabase status]`

## 🛡️ Boundary Requirements (Szigorú Határok)
Ezt a szabályrendszert szigorúan tartsd be minden műveletnél:
✅ **Mindig:** 
- [Specifikus biztonságos akció 1, pl. Végezz RLS ellenőrzést, Logolj hiba esetén]
- [Specifikus biztonságos akció 2]

⚠️ **Kérdezz először:** 
- [Nagy hatású akció 1, pl. Migrációk írása adatbázis sémához, vagy nagy könyvtárak telepítése]

🚫 **Soha:** 
- [Tiltott akció 1, pl. Ne használj kliensoldalon kritikus Admin vagy Service_role API kulcsokat]
- [Tiltott akció 2, pl. Ne csinálj "placeholder" UI generálást valós logika nélkül]

## ✈️ Pre-Flight Quality Gate (Végső Tesztelés)
Mielőtt egy projektet késznek nyilvánítasz (vagy lezársz egy mérföldkövet), **KÖTELEZŐ** végrehajtanod a következő ellenőrzéseket:
1. **Build & Lint:** Futtasd le az `npm run build` és `npm run lint` parancsokat. Ha hibát dob, azonnal javítsd!
2. **Biztonság & Titkos Kulcsok:** Ellenőrizd, hogy nincs-e hardcoded API kulcs vagy jelszó a forráskódban (csak `.env` fájlokban).
3. **RLS (Ha Supabase):** Minden publikus táblán be van kapcsolva a Row Level Security policy?
4. **Happy Path:** Végig tud menni a felhasználó a fő üzleti folyamaton hálózati hiba vagy összeomlás nélkül?

## ✨ Kódolási és Stílus Standardok
- Használj korai visszatéréseket (early return), kerüld a mélyen egymásba ágyazott kódot.
- Használj értelmes elnevezéseket (pl. paramétereknek, class neveknek).
- Tartsd a fájlokat kicsin és komponensenként fókuszáltan.
