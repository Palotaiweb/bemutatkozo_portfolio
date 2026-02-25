# Projekt Brief: AI Oktatói CV & Portfólió Landing Page

## 1. A Projekt Kontextusa és Célja (Mit, Miért, Kinek?)

**Kliens / Főszereplő:**
Palotai Dániel, a **ShiftCore** (mesterséges intelligencia szakértő, B2B automatizálási megoldásokat szállító kkv) alapítója. Szeret kommunikálni, új rendszereket megálmodni és létrehozni. 

**Életrajzi háttér (Elevator Pitch az oldalra):**
*   Születési adatok: 1985.07.18., Budapest.
*   **Műszaki érdeklődés (Gyökerek):** Mechatronikai végzettség. A technika iránti rajongás gyerekkora óta elkíséri, nyomtatott áramköröket tervezett és épített a gimnáziumban. Foglalkozott napelemes szigetüzemű rendszerekkel is.
*   **Vállalkozói tapasztalat (Rugalmasság és Pivot):** Először saját vállalkozásban mézzel készült kézműves csokoládét gyártott. Amikor a kakaó ára drasztikusan megemelkedett, gyorsan profilt váltott: jelenleg egy másik vállalkozásban mikrozöldeket termeszt és értékesít.
*   **AI fókusz:** Bő egy éve főállásban és intenzíven foglalkozik mesterséges intelligenciával. Létrehozta a ShiftCore nevű céget magyar KKV-k AI alapú automatizálására.
*   **Szenvedély és Motivációk:** Kiemelkedő kommunikációs készség. Imád rendszereket tervezni. A célja, hogy elmélet helyett *gyakorlati* AI használatot tanítson.

**A Projekt Apropója ("A Szikra"):**
Dániel elvégzett egy "Prompt Engineering" tanfolyamot az *Euzert* nevű képzőcégnél. A képzés színvonala és az oktató felkészültsége (puszta ChatGPT-másolgatás) kiábrándító volt. Dániel egy önálló, profi AI ügynök (Antigravity) segítségével oldotta meg az Euzert vizsgafeladatát (Six Thinking Hats elemzés) és komplett Python automatizációval (pypandoc, python-docx) adta le a munkát, plusz írt egy kedvcsináló edukációs levelet a többi elégedetlen hallgatónak is.
Amikor az Euzert a negatív visszajelzések miatt felhívta a hallgatókat, Dániel (mint szakmabeli) elmondta az építő kritikáját. Ennek hatására **mind az Euzert, mind a Certop** (egy akkreditált magyar ISO tanúsító és auditor-képző központ, ahonnan az egyik hallgató érkezett) **azonnal felkérte őt, hogy dolgozzon nekik mint AI oktató.**

**A Megoldandó Feladat (A Weboldal célja):**
Mivel Dánielnek be kell küldenie egy önéletrajzot mindkét képzőhelynek, egy hagyományos PDF helyett egy **"Showcase Landing Page-t" (Élő Portfóliót)** szeretne építeni. 
*   **A "WOW" faktor:** A weboldal maga legyen a bizonyíték arra, amit az AI-ról tanít. Lássák rajta a dinamizmust, a modernséget. Rájuk (Euzert, Certop) kell optimalizálni a tartalmat.

---

## 2. Javasolt Oldalstruktúra és Funkciók (Implementation Plan)

### A. Hero Szekció (Az első benyomás)
*   **Fősor (Headline):** Pl. *"Ne csak tanulj az AI-ról. Építs vele."* vagy *"Gyakorlati AI Oktatás és Integráció"*.
*   **Alkím (Subheadline):** *"Hogyan változtatja meg a mesterséges intelligencia a mindennapi munkát? Ezt az oldalt is egy AI ügynök építette, az én iránymutatásaim alapján."*
*   **Call-to-Action (CTA):** "Szakmai Tapasztalat & Tematikák" / "PDF CV Letöltése".
*   **Vizuális elem:** Modern tech-animáció (pl. kódgépelés, finom részecske effektus).

### B. Röviden Rólam (Az ember a technológia mögött)
1985.07-18-án születtem Budapesten. A gimnázium után mechatronikai végzettséget szereztem. A technikai érdeklődésem gyerekkorom óta megvolt, gimnáziumban nyomtatott áramköröket terveztem és építettem. Később napelemes szigetüzemű rendszerekkel is foglalkoztam. Ezután vállalkozást indítottam, amiben mézzel készült kézműves csokoládét gyártottunk. A kakaó áremelkedés miatt bezártunk, helyette egy másik vállalkozás keretein belül mikrozöldeket termelünk és értékesítünk. Bő egy éve foglalkozom mesterséges intelligenciával, és létrehoztam a Shiftcore nevű vállalkozást, melyben magyar kkv-knak nyújtunk automatizálási megoldásokat. Nagyon szeretek kommunikálni, új rendszereket megálmodni és létrehozni. Ezért nagyon szívesen tartanék képzéseket is a mesterséges intelligenciával kapcsolatban, főleg a gyakorlati felhasználásának a területén.

### C. Képzőhely-specifikus "Horog" (Euzert & Certop fókusz)
Kifejezetten az ő üzleti modelljükre szabott szekció.
*   **Euzert:** Felnőttképzés mesterfokon. Az AI mint tréner asszisztens és egyéni kompetenciafejlesztő (flow-élmény megteremtése a monoton tanulás helyett).
*   **Certop:** Minőségirányítás, szabványok (ISO 9001, 27001), belső auditok. Az AI mint dokumentumelemző és auditor-asszisztens, amely másodpercek alatt validál komplex rendszereket.

### D. Az "AI a Gyakorlatban" Showcase (Interaktív WOW szekció)
*   Említés az *Euzert esettanulmányról* (vizsgafeladat megoldása workflow automatizációval).
*   **Fő attrakció (Certop/Euzert Interaktív Demó):** Egy apró felület az oldalon, ahova a felhasználó vagy beír egy problémát/folyamatot, vagy egy lenyíló listából kiválaszt egyet ("Auditálás", "Ügyfélszolgálat", "Tananyaggyártás"). Gombnyomásra (egy fiktív, dizájnos loading folyamat után) kap egy "AI által generált" (de a kódban előre megírt, mockolt) professzionális akciótervet/ellenőrző listát. Ez azonnal megfogja a döntéshozókat.

### E. AI Oktatási Tematikák (Syllabus Sneak Peek)
*   Modul 1: Túl a ChatGPT-n (Prompt architektúrák és RAG alapok).
*   Modul 2: AI a vállalkozások mindennapjaiban (Automatizált workflow-k).
*   Modul 3: AI mint asszisztens a dokumentációkezelésben és auditálásban.

---

## 3. Hosting, Hozzáférés-Kezelés és Auth (Döntési Log)

### A. Hosting Platform
*   **Platform:** **Netlify** (ingyenes tier, egyedi domain nélkül).
*   **Elérési cím formátuma:** `valami.netlify.app` (nincs megvásárolt domain).

### B. SEO / Indexelés – Fontos Döntés
*   A `.netlify.app` aldomainek **alapból NEM blokkoltak** a keresőmotoroknak. Google és más kereső indexelhetné az oldalt, ha valaki linkel rá.
*   **Azonban:** Az indexelés megléte/hiánya **nem elegendő biztonsági védelem** az LLM API-val szemben. Aki megkapja az URL-t, hozzáfér.
*   **Döntés:** Login szükséges az interaktív szekció védelméhez. Az indexelés ellen explicit `X-Robots-Tag: noindex` headert adunk hozzá Netlify konfiguráción keresztül (`netlify.toml`), de ez csak kiegészítő védelem – a valódi védelem az auth.

### C. Hozzáférés-Kezelési Stratégia – „Partial Protection"
*   **Az egész oldalt NEM tesszük login mögé** – a portfólió nyilvános oldala a „WOW faktor", amelyet az Euzert/Certop képviselők megtekinthetnek regisztráció nélkül is.
*   **CSAK az „Interaktív Demó" szekció van login mögé zárva.** Amikor a felhasználó a demóra kattint, egy bejelentkezési modál/overlay jelenik meg.
*   **Engedélyezett felhasználók:** Kizárólag az Euzert és Certop részéről kapnak meghívó emailt a Supabase-en keresztül (invited users only, nem önregisztráció).

### D. Auth és Adatbázis Stack
*   **Auth provider:** **Supabase Auth** (Magic Link / Email+Password, meghívásos modell).
*   **Adatbázis:** **Supabase Postgres** – minimális séma (felhasználók kezelése + opcionálisan LLM interakciók logolása).
*   **LLM API hívás:** A frontend **NEM** hívja közvetlenül az LLM API-t (ez exponálná az API kulcsot). Helyette egy **Supabase Edge Function** (serverless) végzi a hívást, amit csak autentikált session esetén lehet meghívni.
*   **Minimális adatbázis séma:**
    ```
    profiles (id, email, role: 'euzert'|'certop', created_at)
    demo_logs (id, user_id, prompt, response_summary, created_at)  -- opcionális
    ```

### E. Környezeti változók (Netlify-ban tárolandó, `.env`-ben soha nem commitolva)
*   `SUPABASE_URL`
*   `SUPABASE_ANON_KEY` (publikus, de Row Level Security védi)
*   Az LLM API kulcs **kizárólag a Supabase Edge Functionben** él – a frontendre soha nem kerül ki.

---

## 4. Technológiai Stack és Design Ajánlás (Kódoló AI számára)

*   **Keretrendszer ajánlás:** Tiszta, modern **HTML + Vanilla CSS + Vanilla JS**. (Mivel Single Page Portfólióról van szó, kerüljük a felesleges függőségeket, hacsak a dizájn komplexitása nem indokolja a Vite/React/Tailwind használatát, de alapvetően a letisztult, profi "kézműves" kód impresszívebb felesleges bloat nélkül).
*   **Design Irány:**
    *   **Stílus:** "Tech-elegance" / "Cyber". Legyen professzionális, de egyértelműen utaljon a magas technológiára.
    *   **Színek:** Mélykék / Sötét paletta (Dark mode alapból, pl. háttér `#0f172a` vagy `#111827`), kiegészítve éles, prémium neon akcentusokkal (pl. ciánkék `#0ea5e9`, cyber lila `#8b5cf6`). Lásd a mellékelt logót a projektkönyvtárban if requested.
    *   **Tipográfia:** Modern, tiszta sans-serif (pl. `Inter`, `Outfit`, `Space Grotesk`).
    *   **Effektek:** Glassmorphism (üveghatású áttetsző kártyák), Smooth Scroll, és Subtle Micro-animations (finom lebegések, gomb-reakciók). Éljen az oldal. A design-nak "prémium" és "drága" érzetet kell keltenie.

---

## 5. Releváns Linkek a Fejlesztéshez

*   **A "Kliens" cége (ShiftCore):** [https://shiftcore.hu/](https://shiftcore.hu/) (Design elemek, színvilág ihletnek, referenciának pld. neon zöld/kék arculat merítése).
*   **Oktatási célpont 1 (Euzert):** [https://www.euzert.hu/](https://www.euzert.hu/)
*   **Oktatási célpont 2 (Certop):** [https://certop.com/](https://certop.com/)
