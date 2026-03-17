import { useState, useEffect } from "react";
import { saveAimScore } from "../services/scoreServices";

function AimBoard() {
    const [gameState, setGameState] = useState("idle");
    const [targetPos, setTargetPos] = useState({ top: "50%", left: "50%" });
    const [hits, setHits] = useState(0);
    const [misses, setMisses] = useState(0); // <-- ÚJ: Mellékattintások számolása
    const [startTime, setStartTime] = useState(null);
    const [reactionTimes, setReactionTimes] = useState([]);

    // Végleges pontosság állapota
    const [finalAccuracy, setFinalAccuracy] = useState(100);

    const TOTAL_TARGETS = 10;

    useEffect(() => {
        document.body.classList.add("no-scroll");
        return () => document.body.classList.remove("no-scroll");
    }, []);

    const startGame = () => {
        setGameState("playing");
        setHits(0);
        setMisses(0); // Nullázzuk a hibákat is!
        setReactionTimes([]);
        moveTarget();
        setStartTime(Date.now());
    };

    const moveTarget = () => {
        const top = Math.floor(Math.random() * 80) + 10;
        const left = Math.floor(Math.random() * 80) + 10;
        setTargetPos({ top: `${top}%`, left: `${left}%` });
    };

    // Ha mellékattint a dobozban
    const handleBackgroundClick = () => {
        if (gameState === "playing") {
            setMisses((prev) => prev + 1);
        }
    };

    // Ha eltalálja a célt
    const handleHit = async (e) => {
        e.stopPropagation(); // <-- FONTOS: Megakadályozza, hogy a háttér kattintás (miss) is lefusson!
        if (gameState !== "playing") return;

        const now = Date.now();
        const timeTaken = now - startTime;
        const newReactionTimes = [...reactionTimes, timeTaken];
        setReactionTimes(newReactionTimes);

        const newHits = hits + 1;
        setHits(newHits);

        if (newHits >= TOTAL_TARGETS) {
            setGameState("finished");

            const finalAvg = Math.round(newReactionTimes.reduce((a, b) => a + b, 0) / newReactionTimes.length);

            // PONTOSSÁG KISZÁMÍTÁSA (Találatok / Összes kattintás * 100)
            const totalClicks = TOTAL_TARGETS + misses;
            const accuracy = Math.round((TOTAL_TARGETS / totalClicks) * 100);
            setFinalAccuracy(accuracy);

            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            if (currentUser && currentUser.username) {
                try {
                    // Elmentjük az átlag időt és a pontosságot is!
                    await saveAimScore(currentUser.username, finalAvg, accuracy);
                } catch (error) {
                    console.error("Nem sikerült menteni a céllövöldét:", error);
                }
            }
        } else {
            setStartTime(now);
            moveTarget();
        }
    };

    const avgTime = reactionTimes.length > 0
        ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
        : 0;

    return (
        <div
            onClick={handleBackgroundClick} // <-- Hiba számolása, ha ide kattint
            style={{
                position: "relative", width: "100%", height: "60vh", minHeight: "400px",
                background: "rgba(0,0,0,0.2)", borderRadius: "var(--radius)",
                overflow: "hidden", border: "1px solid var(--color-border)",
                boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)"
            }}
        >
            <div style={{ padding: "10px 20px", display: "flex", justifyContent: "space-between", background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}>
                <span style={{ color: "var(--color-text-muted)", fontWeight: "bold" }}>Célpontok: <span style={{color: "var(--color-primary)"}}>{hits} / {TOTAL_TARGETS}</span></span>
                {gameState === "playing" && <span style={{ color: "var(--color-accent)", fontWeight: "bold" }}>Hibák: {misses}</span>}
            </div>

            {gameState === "idle" && (
                <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px" }}>
                    <h2 style={{ color: "var(--color-primary)" }}>🎯 Céllövölde</h2>
                    <button onClick={startGame}>START</button>
                </div>
            )}

            {gameState === "playing" && (
                <div
                    onClick={handleHit} // <-- Jó kattintás
                    style={{
                        position: "absolute", top: targetPos.top, left: targetPos.left,
                        transform: "translate(-50%, -50%)", width: "60px", height: "60px",
                        background: "radial-gradient(circle, var(--color-accent) 20%, white 25%, var(--color-bg) 30%, white 45%, var(--color-accent) 50%, transparent 60%)",
                        borderRadius: "50%", cursor: "crosshair", boxShadow: "var(--glow-accent)"
                    }}
                />
            )}

            {gameState === "finished" && (
                <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "10px" }}>
                    <h2 style={{ color: "var(--color-secondary)", textShadow: "var(--glow-secondary)" }}>Kész!</h2>
                    <p style={{ color: "var(--color-text-muted)" }}>Átlagos reakcióidő:</p>
                    <h3 style={{ color: "var(--color-primary)", fontSize: "2.5rem", margin: 0 }}>{avgTime} ms</h3>

                    <p style={{ color: "var(--color-text-muted)", marginTop: "10px" }}>Pontosság:</p>
                    <h3 style={{ color: finalAccuracy === 100 ? "var(--color-secondary)" : "var(--color-accent)", fontSize: "2rem", margin: 0 }}>
                        {finalAccuracy}%
                    </h3>

                    <button onClick={startGame} style={{ marginTop: "20px" }}>Újra</button>
                </div>
            )}
        </div>
    )
}

export default AimBoard;