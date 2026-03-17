# ⚡ ReflexPro - Reakció és Aim Tesztelő Webalkalmazás

A **ReflexPro** egy modern, e-sport ihlette webes játék, amelynek célja a felhasználók reflexeinek és célzási pontosságának fejlesztése, valamint mérése. A játékosok összemérhetik tudásukat a globális ranglistán, és nyomon követhetik saját fejlődésüket a részletes profiljukon.

## 🚀 Fő funkciók
* **🎮 Két játékmód:** Hagyományos Reakció Teszt és 10-célpontos Céllövölde (Aim Trainer).
* **🔒 Biztonságos Autentikáció:** Felhasználói fiókok kezelése (regisztráció, bejelentkezés) Firebase segítségével, védett útvonalakkal (Route Guards).
* **📊 Részletes Statisztikák:** Személyes rekordok, átlagos reakcióidő, találati pontosság és meccstörténet a Profil oldalon.
* **🏆 Globális Ranglista:** Valós idejű toplista beépített keresővel és rendezési lehetőségekkel.
* **🎨 Testreszabhatóság:** Sötét/Világos mód váltó és 5 különböző, animált Ambiens Fény paletta (Theme Controller).

## 🛠️ Használt Technológiák
* **Frontend:** React (Vite), React Router DOM
* **Backend & Adatbázis:** Firebase (Firestore NoSQL, Authentication)
* **Tesztelés:** Vitest (Unit tesztek), Cypress (E2E tesztek)
* **Stílusozás:** CSS Custom Properties (Design tokenek), Mobile-first reszponzív layout

## 💻 Lokális futtatás lépései

Ha a saját gépeden szeretnéd futtatni a projektet, kövesd az alábbi lépéseket:

1. **Nyisd meg a projekt mappáját** egy terminálban (pl. VS Code / WebStorm terminal).
2. **Telepítsd a függőségeket** az alábbi paranccsal:
   ```bash
   npm install