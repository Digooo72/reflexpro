import { useState, useEffect } from "react"
import ReactionTarget from "./ReactionTarget"
import ScoreDisplay from "./ScoreDisplay"
import { saveScore } from "../services/scoreServices"

function GameBoard() {
    const [gameState, setGameState] = useState("idle")
    const [startTime, setStartTime] = useState(null)
    const [reactionTime, setReactionTime] = useState(null)
    const [timeoutId, setTimeoutId] = useState(null)

    async function handleClick() {
        if (gameState === "idle" || gameState === "finished" || gameState === "early") {
            setGameState("waiting")
            setReactionTime(null)

            const delay = Math.random() * 3000 + 1000

            const id = setTimeout(() => {
                setGameState("ready")
                setStartTime(Date.now())
            }, delay)

            setTimeoutId(id)
        }
        else if (gameState === "waiting") {
            clearTimeout(timeoutId)
            setGameState("early")
        }
        else if (gameState === "ready") {
            const end = Date.now()
            const time = end - startTime
            setReactionTime(time)
            setGameState("finished")

            // Megnézzük, be van-e jelentkezve valaki
            const currentUser = JSON.parse(localStorage.getItem("currentUser"))

            if (currentUser && currentUser.username) {
                try {
                    // Elküldjük a felhőbe az adatot!
                    await saveScore(currentUser.username, time);
                    console.log("Sikeres mentés a Firebase-be!");
                } catch (error) {
                    console.error("Nem sikerült a felhőbe menteni:", error);
                }
            }
        }
    }

    useEffect(() => {
        function handleKey(e) {
            if (e.code === "Space") {
                e.preventDefault()
                handleClick()
            }
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [gameState, startTime, timeoutId])

    // --- ÚJ: GÖRGETÉS LETILTÁSA A JÁTÉK ALATT ---
    useEffect(() => {
        // Amikor a játék komponens betölt, rátesszük a no-scroll osztályt a body-ra
        document.body.classList.add("no-scroll");

        // Amikor elhagyjuk a játékot (cleanup function), levesszük róla, hogy máshol lehessen görgetni
        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, []);

    // --- ÚJ: Dinamikus háttérszín kalkulátor ---
    function getAmbientStyle() {
        let color1, color2;

        switch (gameState) {
            case "waiting": // Piros/Pink (Vigyázz!)
                color1 = "rgba(255, 0, 85, 0.5)";
                color2 = "rgba(255, 0, 85, 0.4)";
                break;
            case "ready": // Zöld (Most!)
                color1 = "rgba(0, 255, 136, 0.5)";
                color2 = "rgba(0, 255, 136, 0.4)";
                break;
            case "early": // Narancssárga (Hiba!)
                color1 = "rgba(245, 158, 11, 0.3)";
                color2 = "rgba(245, 158, 11, 0.2)";
                break;
            case "finished":
            case "idle":
            default: // Alap kék/cián állapot
                color1 = "rgba(0, 229, 255, 0.25)";
                color2 = "rgba(0, 229, 255, 0.15)";
                break;
        }

        return {
            background: `radial-gradient(circle at 30% 40%, ${color1}, transparent 50%), radial-gradient(circle at 70% 60%, ${color2}, transparent 50%)`
        };
    }

    return (
        <>
            {/* Animált, színváltó háttér, ami lefedi az egész képernyőt */}
            <div className="game-ambient-bg" style={getAmbientStyle()}></div>

            <section style={{ textAlign: "center", marginTop: "var(--space-4)", position: "relative", zIndex: 1 }}>

                {/* --- ÚJ: Flex konténer a gombnak és a súgóknak --- */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "var(--space-5)", // Távolság a gomb és a súgók között
                    flexWrap: "wrap" // Ha kicsi a képernyő (mobil), a súgók automatikusan alulra/felülre ugranak
                }}>

                    {/* Bal oldali súgó (Egér) */}
                    <div style={{
                        color: "var(--color-text-muted)",
                        opacity: gameState === "idle" || gameState === "finished" ? 1 : 0,
                        transition: "opacity 0.3s ease",
                        fontSize: "var(--font-sm)",
                        fontWeight: "bold",
                        letterSpacing: "1px",
                        pointerEvents: "none" // Ne lehessen rákattintani
                    }}>
                        <span style={{ fontSize: "32px", display: "block", marginBottom: "8px" }}>🖱️</span>
                        KATTINTÁS
                    </div>

                    {/* A meglévő játékgomb */}
                    <ReactionTarget
                        state={gameState}
                        onClick={handleClick}
                    />

                    {/* Jobb oldali súgó (Space) */}
                    <div style={{
                        color: "var(--color-text-muted)",
                        opacity: gameState === "idle" || gameState === "finished" ? 1 : 0,
                        transition: "opacity 0.3s ease",
                        fontSize: "var(--font-sm)",
                        fontWeight: "bold",
                        letterSpacing: "1px",
                        pointerEvents: "none"
                    }}>
                        <span style={{ fontSize: "32px", display: "block", marginBottom: "8px", border: "2px solid var(--color-text-muted)", borderRadius: "8px", padding: "0 8px", width: "fit-content", margin: "0 auto 8px auto" }}>
                            SPACE
                        </span>
                        BILLENTYŰ
                    </div>

                </div>

                {gameState === "finished" && <ScoreDisplay time={reactionTime} />}
            </section>
        </>
    )
}



export default GameBoard