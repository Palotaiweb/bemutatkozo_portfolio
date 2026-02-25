# 📚 Playbook: Automatizálás (n8n, API) Projekt Előkészítés
*Használd ezt a playbookot olyan projektekhez, ahol a fő cél adatmozgatás rendszerek között, n8n workflow-k építése, webhookok kezelése vagy hosszan futó háttérfolyamatok létrehozása.*

## 1. Generáld le az Alapkörnyezetet
Hozd létre a projektkönyvtárban pontosan az alábbi fájlokat az alapsablonok (`startskill/templates/`) felhasználásával:
1. `AGENTS.md`
2. `PROJECT_MAP.md`
3. `docs/PRD.md` (Fókuszálj az "Eseményekre" [Events], amik a folyamatokat elindítják, és a végkimenetre!)

## 2. Generáld le az Automatizáció-Specifikus Dokumentumokat
A sablonokon túl kötelezően hozd létre a `docs/` mappában:

### `docs/WORKFLOWS.md` (Node-ok és Logika)
Minden automatizálási folyamathoz (workflowhoz) külön-külön részletezd:
- **Trigger Specifikáció (Mi indítja?):** Webhook, Időzítés (Cron), Polling, vagy App Esemény (pl. Stripe Payment)? Milyen a pontos bemeneti JSON struktúra?
- **Adatfolyam Lépések (Node-ok):** Mik fognak történni sorrendben (pl. Webhook -> IF Node Validáció -> HTTP GET Készlet -> Supabase Insert -> Slack Értesítés).
- **Szükséges Hitelesítések (Credentials):** Milyen OAuth vagy API kulcsok fognak kelleni az n8n környezetben (pl. Gmail OAuth2, Stripe API Key)?

### `docs/ARCHITECTURE.md`
Mutasd be, hogy az n8n hogyan kapcsolódik a külvilághoz. Van-e valamilyen helyi adatbázis (pl. Postgres, Redis), ami átmeneti tárolásra szolgál?

### `docs/TASKS.md`
A folyamat struktúrája:
- **Milestone 1: Környezet & Alapok:**
  - Példa Task 1: Webhook fogadó (Trigger) node beállítása és teszt URL generálása.
  - Példa Task 2: Hitelesítő adatok (Credentials) beállítása és tesztelése az n8n-ben (kódolónak mondva, hogy várja meg Dani visszajelzését a sikeres konnektálásról!).

- **Milestone 2: Fő Logika és Adatfeldolgozás:**
  - Példa Task 1: Adat transzformáció (Set / Code node) elkészítése.
  - Példa Task 2: Célrendszerbe (pl. CRM, adatbázis) küldés.

- **Milestone 3: Hibakezelés (Error Handling):** 
  - n8n kifejezett kérés: Építsetek be "Error Trigger" workflow-t! Ha a fő flow megáll, legyen egy slack/email értesítő webhook sub-workflow!

- **Milestone 4 (Végső): Pre-Flight Quality Gate:** Titkos kulcsok (credentials) biztonságának ellenőrzése, teszt adatokkal történő "Happy Path" end-to-end végrehajtás és a Node-ok Rate Limit-jének vizsgálata.

## 3. Finomhangold az `AGENTS.md` fájlt
Gondoskodj róla, hogy az `AGENTS.md` 🚫 **Soha** (Never) része tartalmazza:
- "Soha ne építs monolitikus workflow-kat (több tucat node egyetlen flow-ban)! Helyette használj `Execute Workflow` node-okat a logika kiszervezésére (Sub-workflows)."
- "Soha ne hagyj figyelmen kívül API Rate Limit-eket: ha külső rendszert hívsz loop-ban, alkalmazz várakozást (wait) vagy batch (split_in_batches) logikát!"

Jelentkezz be Daninál, hogy az automatizációs "Scaffold" megépült, és kérd meg a kódoló munkamenet indítására!
