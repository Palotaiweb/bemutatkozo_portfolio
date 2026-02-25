# CLIENT PROFILE – Megrendelő Profil

> **Mi ez és miért fontos?**
> Ez a dokumentum a projekt alapköve. Minden technikai tervezés (PRD, Architecture, Design) ebből a dokumentumból táplálkozik. Leírja, hogy kinek építjük a rendszert, és kik fogják használni.

## Alapadatok
- **Cégnév:** ShiftCore (Palotai Dániel egyéni vállalkozása / mikrovállalkozása)
- **Iparág:** Mesterséges intelligencia, B2B automatizálás, **AI felnőttoktatás**
- **Weboldal:** [https://shiftcore.hu](https://shiftcore.hu)
- **Kontaktszemély:** Palotai Dániel, alapító
- **Cég mérete:** Mikrovállalkozás (1 fő)
- **Célpiac:** B2B (KKV-k) + felnőttképző intézmények (Euzert, Certop)

## Tevékenység
- **Fő szolgáltatások/termékek:**
  - Folyamatautomatizálás (elsősorban n8n alapú workflow-k)
  - Intelligens kommunikáció (AI-vezérelt ügyfélkommunikáció)
  - CRM és adatrendszerezés (Airtable, Supabase)
  - Egyedi kisalkalmazások (webappok, automatizált dokumentumok)
  - **Új: AI felnőttoktatás – gyakorlati AI használat tréning** (Euzert, Certop felkérés)
- **Célközönség (a landing page tekintetében):** Euzert és Certop döntéshozói (képzési koordinátorok, programfelelősök, HR-esek)
- **Piaci pozíció:** „Nem elméleti AI-guru, hanem aki valóban építi a rendszereket" – gyakorlati, mérhető eredményeket hozó AI-oktató
- **Versenytársak:** Általános IT-tanácsadók és elméleti ChatGPT-kurzusokat tartó oktatók – Dániel pontosan ezektől különbözteti meg magát

## Brand & Kommunikáció
- **Hangvétel:** Szakmai, de közvetlen és emberi. **Tegező** – ezt Dániel preferálja, ez tükrözi a ShiftCore stílusát. Kerüli az AI-zsargont; konkrét, kézzel fogható eredményekre fókuszál.
- **Vizuális stílus:**
  - Dark mode alapból (`#0f172a` / `#111827` háttér)
  - Neon akcent: ciánkék (`#0ea5e9`) + cyber lila (`#8b5cf6`)
  - Stílus: „Tech-elegance / Cyber" – prémium, de emberi
  - Effektek: glassmorphism, smooth scroll, micro-animációk
- **Meglévő arculati elemek:** ShiftCore logo és neon zöld/kék arculat (shiftcore.hu referencia)
- **Tipográfia:** Modern sans-serif – `Inter`, `Outfit` vagy `Space Grotesk`

## A Projekt Kontextusa
- **Miért rendeli a projektet:** Dánielnek be kell küldenie egy önéletrajzot az Euzertnek és a Certopnak (AI oktató pozícióra). Hagyományos PDF helyett egy „élő portfóliót" épít, ami maga is bizonyítja a kompetenciáját.
- **Elvárt eredmény:** A döntéshozók gyorsan megértsék Dániel értékajánlatát, legyenek lenyűgözve az oldal minőségétől, és bízzák rá az AI oktatást.
- **Végfelhasználók:**
  - **Euzert:** Felnőttképzési vállalkozás – AI mint motiváló, flow-alapú tréner-asszisztens
  - **Certop:** Tanúsító és auditor-képző – szintén felnőttképzés kontextusban, AI oktatás az ő résztvevőiknek
  - ⚠️ **A fókusz mindkét esetben: felnőttképzés + gyakorlati AI oktatás. ISO audit tevékenység NEM téma.**
- **Digitális érettség:** Mindkét intézmény hagyományosabb szervezet; az AI potenciálját látják, de a konkrét oktatási alkalmazásokat még nem ismerik jól.

## Kutatásból Származó Információk
- **ShiftCore (shiftcore.hu):** „Egyszerűsítjük a bonyolultat, automatizáljuk az ismétlődőt." Mechatronikai háttér, KKV szemlélet, személyes stílus. A „Miért a ShiftCore?" szekciója kiemeli a gyakorlati tapasztalatot.
- **Euzert (euzert.hu):** Felnőttképzési platform (403-as hiba, nem indexelt). Dániel elvégezte a Prompt Engineering kurzusukat – a minőség kiábrándító volt. Ez lett az ok, amiért felkérték: látták benne a jobbat.
- **Certop (hu.certop.com):** Tanúsító + auditor-képző szervezet. Az ő oldalukon is jelenik meg oktatási vonal – a célzott ajánlat: AI oktatás az ő résztvevőiknek.
- **Iparági trend:** A felnőttképzési piacon az AI-integráció egyre fontosabb; a szervezetek nem ChatGPT-oktatót, hanem rendszergondolkodó, gyakorlati tréner-t keresnek.
- **Lehetőségek:** Az interaktív demo **felnőttképzési** use case-eket demonstráljon (pl. tananyaggyártás, egyéni haladás követése, AI mint tanulási asszisztens).

## Hatás a Fejlesztésre

> Ez a szekció összefoglalja, hogy a megrendelő profilja hogyan befolyásolja a technikai döntéseket.

- **Design irány:** Dark mode „Cyber-prémium" esztétika, glassmorphism kártyák, neon akcent. Az oldal maga demonstrálja az AI kompetenciát.
- **Hangvétel a UI-ban:** Tegező, közvetlen, magabiztos – de nem arrogáns. Dániel emberként is jelen van, nem csak egy „AI-cég" arca.
- **Funkcionális prioritások:**
  1. Hero szekció – első benyomás „WOW" effekttel
  2. Interaktív LLM demo (Supabase login-gated) – **felnőttképzési fókuszú**, ez az USP
  3. Felnőttképzésre szabott tartalom (Euzert + Certop kontextus)
- **Az interaktív demo témái (kizárólag felnőttképzés / gyakorlati AI):**
  - „Hogyan tervezz AI-asszisztált tananyagot 10 perc alatt?"
  - „AI mint személyre szabott tanulási asszisztens – mintalépcső"
  - „Prompt-tervezés trénereknek – live példa"
- **Technikai megfontolások:**
  - **Netlify** hosting (ingyenes, `*.netlify.app`), `noindex` fejléc
  - **Supabase Auth** a demó védelméhez (meghívásos modell)
  - **Supabase Edge Function** az LLM API híváshoz (API kulcs soha nem kerül a frontendre)
  - Tiszta **HTML + Vanilla CSS + Vanilla JS** (single-page, nincs felesleges framework)
  - `Inter` / `Outfit` Google Fonts; kézműves CSS (Tailwind nélkül)
