import { useSearchParams } from "react-router-dom"
import GameBoard from "../components/GameBoard"
import AimBoard from "../components/AimBoard"
import Card from "../components/Card"

function GamePage() {
    // useState HELYETT az URL-ből olvassuk ki és írjuk be a játékmódot!
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedGame = searchParams.get("mode");

    // 1. Ha a Reakció tesztet választotta
    if (selectedGame === "reaction") {
        return (
            <section style={{ position: "relative", zIndex: 1, marginTop: "var(--space-4)" }}>
                <button
                    onClick={() => setSearchParams({})} // Ha üres, visszadob a menübe
                    style={{ background: "transparent", border: "1px solid var(--color-primary)", color: "var(--color-primary)", marginBottom: "var(--space-4)", fontSize: "var(--font-sm)", minHeight: "36px", padding: "8px 16px" }}
                >
                    ⬅ Vissza a játékmódokhoz
                </button>
                <GameBoard />
            </section>
        )
    }

    // 2. Ha az Aim Trainert választotta
    if (selectedGame === "aim") {
        return (
            <section style={{ position: "relative", zIndex: 1, marginTop: "var(--space-4)" }}>
                {/* Itt a home-ambient-bg-t használjuk, hogy működjön a paletta! */}
                <div className="home-ambient-bg"></div>
                <button
                    onClick={() => setSearchParams({})}
                    style={{ background: "transparent", border: "1px solid var(--color-primary)", color: "var(--color-primary)", marginBottom: "var(--space-4)", fontSize: "var(--font-sm)", minHeight: "36px", padding: "8px 16px", position: "relative", zIndex: 10 }}
                >
                    ⬅ Vissza a játékmódokhoz
                </button>
                <AimBoard />
            </section>
        )
    }

    // 3. Alapértelmezett nézet: Játékmód Választó
    return (
        <>
            <div className="home-ambient-bg"></div>

            <section style={{ position: "relative", zIndex: 1, textAlign: "center", marginTop: "var(--space-4)" }}>
                <h1 style={{ color: "var(--color-primary)", textShadow: "var(--glow-primary)" }}>Válassz Játékmódot</h1>

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "var(--space-4)",
                    marginTop: "var(--space-5)",
                    maxWidth: "800px",
                    margin: "var(--space-5) auto 0 auto"
                }}>
                    {/* Reakció Teszt Kártya */}
                    <div onClick={() => setSearchParams({ mode: "reaction" })} style={{ flex: "1", minWidth: "300px", cursor: "pointer", transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        <Card title="⚡ Reakció Teszt">
                            <p style={{ color: "var(--color-text-muted)" }}>Várd meg a zöld jelzést, és kattints amilyen gyorsan csak tudsz!</p>
                            <span style={{ display: "inline-block", marginTop: "15px", color: "var(--color-primary)", fontWeight: "bold" }}>Játék Indítása ➔</span>
                        </Card>
                    </div>

                    {/* Céllövölde Kártya */}
                    <div onClick={() => setSearchParams({ mode: "aim" })} style={{ flex: "1", minWidth: "300px", cursor: "pointer", transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        <Card title="🎯 Céllövölde (Aim Trainer)">
                            <p style={{ color: "var(--color-text-muted)" }}>Lődd ki a képernyőn véletlenszerűen felbukkanó 10 célpontot a legjobb átlagidőért!</p>
                            <span style={{ display: "inline-block", marginTop: "15px", color: "var(--color-primary)", fontWeight: "bold" }}>Játék Indítása ➔</span>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}

export default GamePage