# 📄 PRD – Palotai Dániel AI Oktatói Portfólió Landing Page

*Ez a dokumentum rögzíti, hogy MIT építünk. A Hogyan a TASKS.md és az ARCHITECTURE.md feladata.*

## 🎯 1. Projekt Összefoglaló és Célok

Palotai Dániel (ShiftCore) számára építünk egy egyoldalas „Showcase Landing Page-t", amelyet az Euzert és Certop felnőttképző intézményeknek küld el, mint élő önéletrajz. Az oldal maga a bizonyíték: az AI képes professzionális, prémium minőségű outputot előállítani.

- **Siker Mérőszám 1:** A döntéshozó az oldalt megnyitva 30 másodpercen belül megérti Dániel AI oktatói értékajánlatát.
- **Siker Mérőszám 2:** Az interaktív AI demo elérhető és működik bejelentkezett látogatók számára (meghívott Euzert/Certop munkatársak).
- **Siker Mérőszám 3:** Az oldal LCP értéke < 2.5 másodperc (Lighthouse mérés alapján).
- **Siker Mérőszám 4:** Az oldal reszponzív, mobilon is megjeleníthetően.
- **Siker Mérőszám 5:** Az LLM API kulcsa semmilyen körülmények között nem kerül a frontend kódba.

---

## 👥 2. Felhasználói Szerepkörök (Personas / Roles)

1. **Névtelen Látogató (Guest):** Megtekintheti a portfólió oldalát (Hero, Rólam, Tematikák szekciók). Az interaktív demóra kattintva login modált kap.
2. **Meghívott Felhasználó (Euzert/Certop munkatárs):** Supabase Auth-szal bejelentkezhet, és használhatja az interaktív AI demót. Kap egy role mezőt (`euzert` vagy `certop`) a profiljában.
3. **Admin (Dániel):** A Supabase dashboardon kezeli a meghívott felhasználókat. Nincs külön admin UI az oldalon.

---

## 🛠️ 3. Fő Funkciók és Felhasználói Útvonalak (User Stories)

### 3.1. Portfólió megjelenítése (Nyilvános oldal)

**Siker-forgatókönyv (Happy Path):**
* **Given:** Egy Euzert/Certop döntéshozó megkapja Dániel oldalának linkjét.
* **When:** Megnyitja a böngészőben.
* **Then:** Betölt a Hero szekció (animációval, headline-nal, CTA-val), alatta a Rólam, az AI Oktatás tematikák és a demó preview szekció.
* **And:** Az oldal egyetlen görgetéssel végigolvasható, nincs szükség navigációs kattintásra (SPA).

**Hiba-forgatókönyv:**
* **Given:** Lassú mobilnet (3G).
* **When:** Az oldal betölt.
* **Then:** A Hero szekció szövege és CTA gombja jelenik meg azonnal (above the fold), a háttér-animáció csak utána tölt be (progressive enhancement).

---

### 3.2. Interaktív AI Felnőttképzési Demo (Védett szekció)

**Siker-forgatókönyv (Happy Path):**
* **Given:** A látogató görgeti az oldalt és elér a „Próbáld ki élőben" szekciót.
* **When:** Rákattint a „Demo elindítása" gombra.
* **Then:** Megjelenik egy glassmorphism login modál. A felhasználó beírja a meghívott emailjét → Magic Link érkezik → Bejelentkezés után a modál bezárul, és a demo elérhető lesz.
* **And:** A demo felületen a felhasználó kiválaszt egy témát a lenyíló listából (pl. „AI-asszisztált tananyag tervezés", „Prompt-tervezés trénereknek", „Személyre szabott tanulási útvonal") → rákattint a „Generálás" gombra → **Supabase Edge Function** hívja az LLM API-t → az eredmény egy strukturált markdown panel formájában jelenik meg a jobb oldalon.

**Hiba-forgatókönyv – LLM timeout:**
* **Given:** A Supabase Edge Function nem kap választ az LLM-től 10 másodpercen belül.
* **When:** A felhasználó a „Generálás" gombra kattintott.
* **Then:** A demo panel megjelenít egy barátságos hibaüzenetet: „Az AI most túlterhelt, próbáld újra egy perc múlva." A gomb újra aktív lesz.

**Hiba-forgatókönyv – Nem meghívott felhasználó:**
* **Given:** Valaki megpróbál bejelentkezni egy nem meghívott emailcímmel.
* **When:** Magic Link-et kér.
* **Then:** A rendszer (Supabase) nem küld emailt; az UI megjelenít egy üzenetet: „Ez az email nincs a meghívottak listáján. Kérjen hozzáférést Palotai Dánieltől."

---

### 3.3. Supabase Auth – Magic Link bejelentkezés

**Siker-forgatókönyv:**
* **Given:** A meghívott felhasználó megadja az emailjét a login modálban.
* **When:** Rákattint a „Küld" gombra.
* **Then:** Supabase Magic Link emailt küld. A felhasználó a linkre kattintva visszakerül az oldalra, automatikusan bejelentkezve. Session cookie 7 napig érvényes.

---

## 🎨 4. Vizuális és UX Követelmények

- **Általános Hangulat:** Dark mode, tech-elegance, glassmorphism, prémium SaaS érzet
- **Háttér (Background):** `#0f172a` (mély tengerészkék)
- **Surface (Kártyák, Modálok):** `#1e293b` + `rgba(255,255,255,0.05)` backdrop-filter blur glassmorphism
- **Elsődleges Szín (Primary / CTA):** Ciánkék `#0ea5e9`
- **Másodlagos Akcent:** Cyber lila `#8b5cf6`
- **Szöveg (Alap):** `#f1f5f9` (szinte fehér)
- **Szöveg (Muted):** `#94a3b8`
- **Tipográfia:** `Outfit` (headings) + `Inter` (body) – Google Fonts
- **Effektek:** Particle / kódgépelő animáció Hero-ban, micro-animációk gombokon, smooth scroll
- **Kritikus Követelmény:** Reszponzív (mobilbarát) megjelenés kötelező, min. 375px szélességig.

---

## ⛔ 5. Edge Case-ek és „Mi van ha..." forgatókönyvek

- **LLM API nem válaszol:** Retry logika az Edge Functionben (max 2 újrapróbálkozás), majd felhasználó-barát hibaüzenet.
- **Supabase session lejár demo közben:** A demo panelen megjelenik egy „Session lejárt, kérlek jelentkezz be újra" üzenet, újra megnyílik a login modál.
- **Nem meghívott felhasználó:** Magic Link nem kerül kiküldésre; UI visszajelez (lásd 3.2. hiba-forgatókönyv).
- **JavaScript ki van kapcsolva:** Az oldal szöveges tartalma (Hero, Rólam, Tematikák) CSS-sel is megjelenik; a JS-dependens demó és animációk graceful degradation-nel kezelendők.
- **Mobil érintőképernyő:** Minden interaktív elem min. 44×44px érintési területtel rendelkezik.
