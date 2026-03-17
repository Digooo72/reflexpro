# Adatmodell Terv (Data Model)

## Entitások és mezők

### 1. User (Felhasználó)
A regisztrált játékosok adatait tároló entitás.
* `id` (UUID, Primary Key)
* `username` (String, Egyedi)
* `email` (String, Egyedi)
* `password_hash` (String)
* `created_at` (Timestamp)

### 2. GameSession (Játékmenet)
Egyetlen lejátszott reakcióteszt kör eredménye.
* `id` (UUID, Primary Key)
* `user_id` (UUID, Foreign Key)
* `reaction_time_ms` (Integer) - *Null, ha túl korán kattintott*
* `is_valid_click` (Boolean) - *False, ha korai (False start) volt*
* `played_at` (Timestamp)

### 3. LeaderboardEntry (Ranglista bejegyzés)
Egy játékos valaha elért legjobb eredménye, gyorsítótárazva a gyors lekérdezéshez.
* `id` (UUID, Primary Key)
* `user_id` (UUID, Foreign Key)
* `best_time_ms` (Integer)
* `achieved_at` (Timestamp)

### 4. Achievement (Jelvény / Eredmény)
Feloldható plecsnik/eredmények (pl. "Villámkezű", "Első játék").
* `id` (UUID, Primary Key)
* `title` (String) - *pl. "150ms alatti kattintás"*
* `required_ms` (Integer)
* `icon_name` (String)

### 5. UserAchievement (Kapcsolótábla)
Nyilvántartja, hogy melyik felhasználó melyik jelvényt mikor szerezte meg.
* `id` (UUID, Primary Key)
* `user_id` (UUID, Foreign Key)
* `achievement_id` (UUID, Foreign Key)
* `unlocked_at` (Timestamp)

## Kapcsolatok (Relációk)

* **User (1) : (N) GameSession**: Egy felhasználó végtelen számú játékmenetet játszhat le.
* **User (1) : (1) LeaderboardEntry**: Egy felhasználónak csak egy (a valaha volt legjobb) eredménye szerepel a toplistában.
* **User (N) : (M) Achievement**: Több-a-többhöz (N:M) kapcsolat. Egy játékos több jelvényt is megszerezhet, és egy adott jelvényt több játékos is birtokolhat. Ezt az N:M kapcsolatot a **UserAchievement** entitás oldja fel (User 1:N UserAchievement, és Achievement 1:N UserAchievement).

### Vizuális Diagram

```text
+--------------+       1:N       +-------------------+
|     User     | ───────────────<|    GameSession    |
+--------------+                 +-------------------+
  |          |
  | 1:1      | 1:N
  v          v
+--------------+                 +-------------------+
|  Leaderboard |                 |  UserAchievement  |
+--------------+                 +-------------------+
                                           ^
                                           | N:1
                                 +-------------------+
                                 |    Achievement    |
                                 +-------------------+