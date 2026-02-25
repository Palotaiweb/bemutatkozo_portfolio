# 📚 Playbook: Intelligens Kommunikáció (AI Comms) Projekt Előkészítés
*Használd ezt a playbookot AI asszisztensek, Chatbotok, Voice Agentek, vagy nyelvi modellt (LLM) intenzíven használó kommunikációs felületek előkészítéséhez.*

## 1. Generáld le az Alapkörnyezetet
Hozd létre a projektkönyvtárban pontosan az alábbi fájlokat az alapsablonok (`startskill/templates/`) felhasználásával:
1. `AGENTS.md`
2. `PROJECT_MAP.md`
3. `docs/PRD.md` (Itt fókuszálj az "Asszisztens Céljára", a célközönségre és a beszélgetés hangvételére!)

## 2. Generáld le az AI-Specifikus Dokumentumokat
A sablonokon túl kötelezően hozd létre a `docs/` mappában:

### `docs/AI_PERSONA.md` (Karakter és Tudásbázis)
Ez a dokumentum írja le az üzemeltetett AI (pl. a chatbot) viselkedését.
- **Persona:** Mi a szerepe? (Pl. Segítőkész ügyfélszolgálatos, Agresszív sales-es, Precíz technikai tanácsadó).
- **Hangvétel (Tone of Voice):** Tegező / Magázó, formális vagy laza? Használ-e emojikat?
- **Tudásbázis (Knowledge Base | RAG):** Milyen adatokból dolgozik? (Pl. Egy adott cég weboldalának szövege, egy feltöltött PDF doksi, stb.) Milyen információkat NEM oszthat meg soha?

### `docs/ARCHITECTURE.md`
Vázold fel az AI integrációját!
- **Modell (LLM):** Milyen modellt (pl. OpenAI GPT-4o, Claude 3.5 Sonnet, Gemini Pro) és szolgáltatót (OpenAI, Anthropic, Vertex) használunk?
- **Tools / Function Calling:** Milyen "Képességei" lesznek az AI-nak a beszélgetésen túl? Tud-e API-n keresztül időpontot foglalni naptárba, adatbázisból olvasni, vagy emailt küldeni?
- **Platform:** Hol fog futni a bot? (Saját egyedi React chat UI, Voice platform mint a Vapi/Bland, vagy beágyazva egy WhatsApp / Messenger botba?)

### `docs/TASKS.md`
A megvalósítás fázisai:
- **Milestone 1: AI Logika Inic (A Kódolónak):**
  - Prompt és System prompt fájlok (vagy változók) inicializálása a kódolónak.
  - Alapvető LLM hívás tesztelése CLI-ből.
- **Milestone 2: Képességek (Tools):** API funkcióhívások bekötése és tesztelése a modellhez.
- **Milestone 3: Platform Integráció:** Frontend (chat ui) vagy Voice Provider SDK rákötése a backendre.
- **Milestone 4: Finomhangolás:** Teszt beszélgetések és Rate Limit / Visszaélésvédelem (Prompt Injection prevenció) beépítése.
- **Milestone 5 (Végső): Pre-Flight Quality Gate:** Kulcsok (API Keys) rejtettségének ellenőrzése `.env` fájlokban, Edge Cases (pl. LLM hallucináció vagy tool hiba) lekezelésének tesztelése.

## 3. Finomhangold az `AGENTS.md` fájlt
Gondoskodj róla, hogy az `AGENTS.md` ✅ **Mindig** (Always) része tartalmazza:
- "Mindig logoljuk le (vagy biztosítsunk felületet) a beszélgetések (User <-> AI) tartalmát, hogy később finomhangolhassuk a promptokat."
- "Az LLM backend hívásait (API Key-eket) SOHA ne exponáljuk a frontend kliens számára."

Jelentkezz be Daninál, hogy az AI kommunikációs alapok generálása kész, és indulhat a fejlesztési beszélgetés!
