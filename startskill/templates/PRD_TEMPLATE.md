# 📄 Product Requirements Document (PRD.md)
*Ez a dokumentum rögzíti, hogy **MIT** (és nem hogyan) építünk. A "Hogyan" a TASKS.md és az ARCHITECTURE.md feladata.*

## 🎯 1. Projekt Összefoglaló és Célok
Mi a projekt konkrét célja? Milyen problémát oldunk meg és kinek? 
Honnan tudjuk, hogy a projekt sikeres (Mik a fő siker mérőszámok / Success Metrics)?
- [Rövid leírás a projektről]
- **Siker Mérőszám 1:** [Példa: A rendelési folyamat < 3 lépésben végrehajtható]
- **Siker Mérőszám 2:** [Példa: Az oldal LCP értéke < 2.5 másodperc]

## 👥 2. Felhasználói Szerepkörök (Personas / Roles)
Kik fogják használni a rendszert?
1. **Látogató / Vendég:** [Mit csinálhat]
2. **Bejelentkezett Felhasználó:** [Mit csinálhat]
3. **Adminisztrátor:** [Mit csinálhat]

## 🛠️ 3. Fő Funkciók és Felhasználói Útvonalak (User Stories)
*(Minden feature-nek mérhető Specification by Example formátumban kell lennie! A "Given/When/Then" szerkezet használata erősen ajánlott.)*

### 3.1. [Funkció 1 Neve. Pl.: Online időpontfoglalási rendszer]
**Siker-forgatókönyv (Happy Path):**
* **Given (Adott):** [Példa: A felhasználó a foglalási oldalon van és kiválaszt egy szabad időpontot]
* **When (Amikor):** [Példa: Megadja a nevét, emailjét és rákattint a foglalás gombra]
* **Then (Akkor):** [Példa: A naptárrendszer visszaigazolja a foglalást, és a rendszer küld egy megerősítő emailt a felhasználónak]
* **And (És):** [Példa: Az admin dashboardon megjelenik a foglalás "Függőben" státusszal]

**Hiba vagy Alternatív forgatókönyv:**
* **Given (Adott):** [Példa: Két felhasználó egyszerre próbálja lefoglalni ugyanazt az időpontot]
* **When (Amikor):** [Példa: A második felhasználó rákattint a foglalás gombra, miután az időpont már elkelt]
* **Then (Akkor):** [Példa: A rendszer egy barátságos hibaüzenetet jelenít meg (pl. "Az időpont időközben betelt"), és felkínálja a következő szabad időpontokat]

*(Ismételd meg ezt a szerkezetet a többi fő funkcióra is.)*

### 3.2. [Funkció 2 Neve]
...

## 🎨 4. Vizuális és UX Követelmények (UI Projektek esetén)
Milyen a vizuális irány? (Színek, betűtípusok, általános hangulat, referenciák)
- **Általános Hangulat:** [Pl.: Modern, sötét mód, SaaS, minimalista]
- **Elsődleges Szín (Primary Color):** [Pl.: Kék (#0055FF)]
- **Másodlagos / Kiegészítő Szín:** [Pl.: Fehér, Szürke árnyalatok]
- **Tipográfia:** [Pl.: Inter, Roboto]
- **Kritikus Követelmény:** Reszponzív (mobilbarát) megjelenés kötelező!

## ⛔ 5. Edge Case-ek és "Mi van ha..." forgatókönyvek (Biztonság & Hibakezelés)
Mit nem szabad csinálni a felhasználónak? Mik a lehetséges hibaállapotok?
- [Példa: Mi történik, ha egy harmadik féltől származó API nem válaszol? -> Újrapróbálkozási logika (Retry) 3-szor, majd fallback hibaüzenet.]
- [Példa: Input validáció hiba az űrlapokon jelszó esetén -> Pontos visszajelzés a hiányzó karakterekről.]
- [Példa: Nincs hálózat -> "Offline vagy" üzenet megjelenítése.]
