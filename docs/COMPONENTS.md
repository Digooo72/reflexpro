## 1. Komponensfa (Hierarchia)

Az alkalmazás React alapú komponens-szerkezete.

```text
App (Root)
 ├── Navbar (Globális navigáció)
 └── Router (Útválasztó)
      ├── HomePage
      │    ├── Card (Játék link)
      │    ├── Card (Ranglista link)
      │    └── Card (Statisztika link)
      ├── GamePage
      │    └── GameBoard (Játék logika)
      │         ├── ReactionTarget (Kattintható interaktív célpont)
      │         └── ScoreDisplay (Eredménykijelző ms-ben)
      ├── LeaderboardPage
      │    └── LeaderboardTable
      │         ├── PlayerRow (Játékos 1)
      │         └── PlayerRow (Játékos 2...)
      ├── ProfilePage
      │    ├── Card (Személyes legjobb statisztika)
      │    └── Card (Átlagos reakcióidő)
      ├── LoginPage
      └── RegisterPage