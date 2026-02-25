# 📚 Playbook: CRM és Adatrendszerezés Projekt Előkészítés
*Használd ezt a playbookot olyan rendszerekhez, ahol az elsődleges cél az információk tárolása, összekapcsolása és vizualizációja (pl. Airtable, belső admin szerkesztők, ügyfélnyilvántartók).*

## 1. Generáld le az Alapkörnyezetet
Hozd létre a projektkönyvtárban pontosan az alábbi fájlokat az alapsablonok (`startskill/templates/`) felhasználásával:
1. `AGENTS.md`
2. `PROJECT_MAP.md`
3. `docs/PRD.md` (Fókuszálj az adatelérésre, a csapat együttműködésére és az adatbeviteli formokra!)

## 2. Generáld le a CRM-Specifikus Dokumentumokat
A sablonokon túl kötelezően hozd létre a `docs/` mappában:

### `docs/CLIENT_PROFILE.md`
> A `startskill/templates/CLIENT_PROFILE_TEMPLATE.md` alapján készítsd el az Ügyfél-Megismerés (0. Fázis) válaszaiból és a weben végzett kutatásodból. Ebből fog származni a teljes UI hangulata és a célközönség meghatározása.

### `docs/DESIGN_SYSTEM.md`
> A `startskill/templates/DESIGN_SYSTEM_TEMPLATE.md` szigorú Anti-AI-Slop szabályai alapján készíts egy, a megrendelőhöz illeszkedő, teljesen egyedi, vizuális rendszert. Színek (Tailwind Token Mapping), tipográfia, és spacing.

### `docs/SCHEMA.md` (Adat Entitások és Kapcsolatok)
A CRM rendszerek lelke az adatbázis! (Legyen az Postgres, Supabase vagy Airtable bázis):
- Részletesen definiálj minden entitást (Táblát) pl: Ügyfelek, Kommentek, Projektek.
- **Field Types:** Határozd meg a pontos adattípusokat (Pl. Select / Enum, Date, Linked Record, Formula, Rollup).
- **Relációk (Relationships):** Pontosan jelöld a kapcsolatokat. Egy ügyfélnek több projektje is lehet? (One-to-Many).
- **Nézetek (Views):** A táblázatokon belüli nézetek definiálása (Kanban tábla, Naptár nézet, Csak Aktív Ügyfelek grid, stb).

### `docs/ARCHITECTURE.md`
A CRM rendszer infrastruktúrája.
- Használunk-e "alacsony-kódolású" (Nocode/Lowcode) felületet mint az Airtable Base vagy Supabase Studio, esetleg egyedi Admin Dashboardot fejlesztünk React/Retool segítségével?
- Milyen felhasználói jogosultsági szintek (Roles) vannak, mit láthat / szerkeszthet egy Menedzser vs. egy junior kolléga?

### `docs/TASKS.md`
A fejlesztés lépései a CRM-eknél:
- **Milestone 1: Adatmodell Létrehozása:**
  - Példa Task: Táblák (Entities) inicializálása az elsődleges oszlopokkal.
  - Példa Task: Idegen kulcsok / Relation fieldek bekötése a táblák közt.
  - Példa Task: Teszt (Mock) adatok feltöltése a Coder AI által.

- **Milestone 2: Nézetek és UI Építés:**
  - Ha egyedi fejlesztés: A "/design-system" módszer beüzemelése a felületi elemek (táblázatok, szűrők, gombok) tesztelésére.
  - Kanban boardok, szűrők beállítása a UI-n.

- **Milestone 3: Biztonság (Row Level Security / Permissions):** Hozzáférési jogosultságok lekódolása.
- **Milestone 4 (Végső): Pre-Flight Quality Gate:** Futtass le Build tesztet (`npm run build`), ha egyéni kód. Minden táblánál egyenként ellenőrizd az RLS policy-kat, hogy nincsenek-e túlzottan engedékeny (ex. `true` insert) szabályok, és csinálj egy próbát a CRUD műveletekre!

## 3. Finomhangold az `AGENTS.md` fájlt
Gondoskodj róla, hogy az `AGENTS.md` 🚫 **Soha** (Never) része tartalmazza:
- "Soha ne módosíts adatbázis sémát (Schema) a kódolás fázisában Dani előzetes jóváhagyása nélkül, mivel ez megtörheti a meglevő adatokat!"
- "Soha ne hagyj jóváhagyatlan 'DELETING' hívásokat."

Jelentkezz be Daninál, formálisan készre jelentve a CRM rendszer "Scaffolding" fázisát!
