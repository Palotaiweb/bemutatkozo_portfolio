# 📚 Playbook: Kombinált/Rendszerintegrációs Projekt Előkészítés
*Kifejezetten azokhoz a komplex projektekhez, ahol több felület/rendszer találkozik (pl. Egy Webalkalmazásból vezérelt n8n automatizálási hálózat).*

## 1. Generáld le az Alapkörnyezetet
Hozd létre a projektkönyvtárban pontosan az alábbi fájlokat az alapsablonok (`startskill/templates/`) felhasználásával:
1. `AGENTS.md`
2. `PROJECT_MAP.md`
3. `docs/PRD.md` (Emeld ki az "Ügyfél Utat", azaz mikor lép be melyik rendszer a kommunikációba!)

## 2. Rendszerhatárok Kijelölése (INTEGRATION.md) És Ügyfélprofil
A kombinált rendszerek legfőbb hibaforrása az, hogy a kódoló AI összemossa a felelősségeket a Frontend szerver és egy automatizációs szerver (pl. n8n) között. 

### `docs/CLIENT_PROFILE.md` & `docs/DESIGN_SYSTEM.md`
> Töltsd ki az alap templates alapján a Megrendelő profilját és a UI design system szabályokat (mint minden Frontend-et is tartalmazó projektnél).

### `docs/INTEGRATION.md`
Ennek a fájlnak tartalmaznia kell a szerződést (Event Contract) a rendszerek között.
- **Webhook Végpontok (WebApp -> n8n):** Milyen metódus (POST/GET), auth, és pontos JSON struktúra (Payload) várható? Például: Ha új regisztráció történik, milyen JSON megy az n8n-be?
- **API Hívások (n8n -> WebApp / Adatbázis):** Hol nyúl vissza külső szolgáltató az applikációnkhoz? (Pl. Státusz frissítés patch kéréssel).

## 3. Playbookok Mixje
A többi `docs/` specifikációs fájl legenerálásához **fusd át azokat a playbookokat**, amikre a projektnek szüksége van (pl. `webapp_scaffold.md` és `automation_scaffold.md`). Így hozz létre teljeskörű `SCHEMA.md` és `WORKFLOWS.md` fájlokat!

### `docs/TASKS.md`
A feladatok sorrendje kritikus a kombinált rendszereknél!
- **Milestone 1:** Adatbázis felépítése (Schema). Enélkül egyik modul sem tud mivel doglozni.
- **Milestone 2:** Backend API / Webhook végpontok inicializálása (az Interface).
- **Milestone 3:** n8n Workflow-k (vagy AI Asszisztensek / Automation) felépítése.
- **Milestone 4:** Frontend UI integráció (Gombok bekötése).
- **Milestone 5 (Végső): Pre-Flight Quality Gate:** Rendszerek közötti végpont tesztelés (E2E), Build teszt a frontendhez, környezeti változók ellenőrzése, és Happy Path futtatása az integrációkon.

Egyértelművé kell tenni, hogy a Kódoló munkamenet **ne ugráljon véletlenszerűen a rendszerek között.**

## 4. Finomhangold az `AGENTS.md` fájlt
Jelentkezz be Daninál azzal, hogy az integrációs struktúra elkészült, és ajánlj egy logikus kódolási folyamatot (pl. "Először a Supabase részt építsük fel a Coder-rel, aztán az n8n workflowkat").
