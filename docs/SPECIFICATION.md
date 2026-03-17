# Projekt Specifikáció: Reflex Tesztelő Játék

## 1. Projekt leírás
A ReflexPro egy modern, interaktív webalkalmazás, amelynek célja a felhasználók vizuális reakcióidejének hajszálpontos mérése és fejlesztése. Az alkalmazás célközönsége a kompetitív e-sportolók (akik bemelegítésre használhatják), az alkalmi játékosok, illetve bárki, aki szeretné tesztelni a szem-kéz koordinációját. A szoftver egy vizuális inger (színváltozás) megjelenítése és a felhasználói interakció (kattintás) közötti időt méri milliszekundumban, majd ezt statisztikákká és globális ranglistává alakítja.

## 2. Funkcionális követelmények
A funkciók a következő főbb modulokra bonthatók:

**Játékmenet modul**
* Reakcióidő mérése ezredmásodperc (ms) pontossággal.
* Véletlenszerű várakozási idő (1-4 másodperc) az inger megjelenéséig a kiszámíthatóság elkerülése érdekében.
* Hibás (túl korai) kattintás felismerése és büntetése (False start).

**Felhasználókezelés modul**
* Felhasználói fiók regisztrációja e-mail címmel és jelszóval.
* Biztonságos bejelentkezés és kijelentkezés.
* Saját profil megtekintése személyes statisztikákkal.

**Ranglista és Statisztika modul**
* Globális Top 10 ranglista megjelenítése.
* Személyes legjobb idő, átlagos reakcióidő és a lejátszott mérkőzések számának automatikus kiszámítása.

## 3. Nem-funkcionális követelmények
* **Technológiai stack:** Frontend: React (Vite környezetben), Backend: Node.js / Express, Adatbázis: PostgreSQL.
* **Teljesítmény:** A játéktér (DOM) frissítése azonnali kell legyen (késleltetés < 10ms), hogy a mérés valid maradjon. Az oldalak betöltési ideje nem haladhatja meg a 2 másodpercet.
* **UX/UI elvárások:** Sötét módú (dark mode), modern, reszponzív (mobile-first) "gamer" esztétika. A játék gombjának minimum 44x44px méretűnek kell lennie, hogy érintőképernyőn is könnyen használható legyen.
* **Akadálymentesítés:** Billentyűzetes támogatás (szóköz gombbal is lehessen játszani), kontrasztos színek (WCAG AA).

## 4. Felhasználói szerepkörök
* **Látogató (Guest):** Használhatja a játékot, de az eredményei csak lokálisan (Local Storage) tárolódnak. Nem kerül fel a globális ranglistára, és ha böngészőt vált, elvesznek az adatai.
* **Regisztrált játékos (User):** Bejelentkezés után a játékai a szerveren tárolódnak. Versenyezhet a globális ranglistán, és bármilyen eszközről hozzáférhet a részletes statisztikáihoz (átlagok, fejlődési görbék).

## 5. Képernyő-lista / Sitemap
Az alkalmazás az alábbi oldalakat tartalmazza (React Router navigációval):
* **Főoldal (`/`)**: Üdvözlő képernyő, navigációs kártyákkal a főbb funkciók felé.
* **Játék oldal (`/game`)**: Maga a játéktábla a reakciómérő gombbal.
* **Ranglista (`/leaderboard`)**: Táblázatos nézet a legjobb játékosokkal.
* **Profil (`/profile`)**: Személyes műszerfal az átlagos és legjobb időkkel.
* **Bejelentkezés (`/login`) & Regisztráció (`/register`)**: Hitelesítési űrlapok.
* **404 Hibaoldal (`*`)**: Érvénytelen útvonal esetén megjelenő figyelmeztetés.