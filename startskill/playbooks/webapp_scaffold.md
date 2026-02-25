# 📚 Playbook: Webalkalmazás (Webapp) Projekt Előkészítés
*Használd ezt a playbookot olyan React / Next.js / Vite projektekhez, ahol bejelentkezés (Auth), adatbázis (CRUD), vagy Supabase backend van.*

## 1. Generáld le az Alapkörnyezetet
Hozd létre a projektkönyvtárban pontosan az alábbi fájlokat az alapsablonok (`startskill/templates/`) felhasználásával:
1. `AGENTS.md`
2. `PROJECT_MAP.md`
3. `docs/PRD.md` (Töltsd ki az alkalmazás egyedi logikájával és céljaival)

## 2. Generáld le a Webapp-Specifikus Dokumentumokat
A fenti sablonokon túl kötelezően hozd létre a `docs/` mappában:

### `docs/CLIENT_PROFILE.md`
> A `startskill/templates/CLIENT_PROFILE_TEMPLATE.md` alapján készítsd el az Ügyfél-Megismerés (0. Fázis) válaszaiból és a weben végzett kutatásodból. Ebből fog származni a teljes UI hangulata és a célközönség meghatározása.

### `docs/DESIGN_SYSTEM.md`
> A `startskill/templates/DESIGN_SYSTEM_TEMPLATE.md` szigorú Anti-AI-Slop szabályai alapján készíts egy, a megrendelőhöz illeszkedő, teljesen egyedi, vizuális rendszert. Színek (Tailwind Token Mapping), tipográfia, és spacing.


### `docs/SCHEMA.md` (Adatbázis és Biztonság)
Írd meg a pontos táblaszerkezetet!
- Használj Supabase konvenciót: `snake_case` táblák (többes számban, pl. `users`, `posts`), oszlopok szintén `snake_case`.
- **KÖTELEZŐ ELEM:** Minden táblához expliciten határozd meg a Row Level Security (RLS) policy-kat! Például: *"Felhasználók csak a saját soraikra hajthatnak végre SELECT/UPDATE-et (auth.uid() = user_id)"*. Ezt a kódolásnál a Coder AI is ellenőrizni fogja.

### `docs/ARCHITECTURE.md`
Tartalmazza: 
- A Tech Stack-et (pl. Next.js App Router, TailwindCSS, Supabase Auth).
- Melyik könyvtárak futnak szerver oldalon és melyek kliens oldalon.
- **Környezeti változók (Env vars):** Mikre lesz szükség (pl. `NEXT_PUBLIC_SUPABASE_URL`).

### `docs/TASKS.md`
Bontsd le a megvalósítást konkrét, kipipálható feladatokra, de szigorúan tartsd a következő sorrendet az első két mérföldkövön:

- **Milestone 1: Init & UI Validáció (KÖTELEZŐ):**
  - Task 1: Új projekt inicializálása a keretrendszerrel. 
  - Task 2: Tailwind konfig és globális CSS beállítása a vizuális irány (színek, betűtípus) alapján.
  - Task 3: `app/design-system` (vagy megfelelő route) létrehozása. Ez lesz a "Kitchen Sink" oldal! Tedd ide az összes gomb típust, inputot, kártya stílust és tipográfiát statikus, beégetett adatokkal. Cél: Dani ezen az oldalon validálja a vizuális megjelenést, MIELŐTT tovább haladtok.

- **Milestone 2: Backend & Auth:** Adatbázis típusok, RLS, és bejelentkező oldal.
- **Milestone 3+:** Alkalmazás üzleti logikája.
- **Milestone 4 (Végső): Pre-Flight Quality Gate:** Futtass le egy Build tesztet (`npm run build`), ellenőrizd a `.env` fájlok kizárását, a Supabase RLS policy-k meglétét minden elkészült táblán, végül végezz egy Happy Path tesztet a fő funkción!

## 3. Finomhangold az `AGENTS.md` fájlt
Gondoskodj róla, hogy az `AGENTS.md` 🚫 **Soha** (Never) része tartalmazza:
- "Soha ne használj a kliens (böngésző) oldali kódban Supabase Service_role (admin) kulcsot!"

És a ✅ **Mindig** (Always) része:
- "Legyen RLS policy minden új táblán."

Jelentkezz be Daninál, hogy elkészült az előkészítés, és mutasd meg neki a `TASKS.md` első mérföldkövét a "Living Style Guide" tesztről!
