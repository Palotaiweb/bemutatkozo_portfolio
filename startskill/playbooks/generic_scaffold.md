# 📚 Playbook: Általános (Generic) Projekt Előkészítés
*Használd ezt a playbookot, ha a projekt nem illik be egyértelműen a többi kategóriába.*

## 1. Generáld le az Alapkörnyezetet
Hozd létre a projektkönyvtárban pontosan az alábbi fájlokat az alapsablonok (`startskill/templates/`) felhasználásával:
1. `AGENTS.md` (Gyökérkönyvtár)
2. `PROJECT_MAP.md` (Gyökérkönyvtár)
3. `docs/PRD.md` (A megbeszélt üzleti célok és követelmények alapján kitöltve)

## 2. Generáld le az Architektúra és Feladat Dokumentumokat
Készítsd el az alábbi két fájlt a `docs/` mappába a saját tudásod alapján (sablon nélkül):

### `docs/ARCHITECTURE.md`
Ennek a fájlnak tartalmaznia kell:
- **Áttekintés:** A rendszer működésének vázlatos leírása.
- **Tech Stack:** Milyen technológiákat, keretrendszereket, könyvtárakat fogtok használni (pontos verziókkal, ahol lehet).
- **Megközelítés:** Bármilyen architekturális minta vagy elv (pl. funkcionális programozás, objektum-orientált, eseményvezérelt), amit be kell tartani.

### `docs/TASKS.md`
A `PRD.md` és az `ARCHITECTURE.md` ismeretében bontsd le a megvalósítást konkrét, egymást követő feladatokra (Taskok). 
- Minden feladat (`[ ]`) legfeljebb 1-2 fájl módosítását igényelje.
- Rendelj hozzájuk konkrét Elfogadási Kritériumot (Acceptance Criteria), aminek teljesülnie kell.
- **FONTOS:** Az M1 (Milestone 1) mindig az alapok lefektetése legyen (Hello World, Init, vagy alap konfig felállítása).
- **ZÁRÓ Milestone: Pre-Flight Quality Gate:** Írd elő a megépült kód Build/Szintaktikai ellenőrzését, titkos kulcsok kiszűrését a kódból és az elfogadási kritériumok végső Happy Path tesztjét.

## 3. Finomhangolás és Befejezés
1. Ellenőrizd, hogy a generált fájlok magyar nyelvűek-e.
2. Jelentkezz be Daninál, hogy a "Generic Scaffold" elkészült, és indíthatja a fejlesztői AI munkamenetet.
