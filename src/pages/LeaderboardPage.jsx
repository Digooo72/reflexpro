import { useState } from "react"
import LeaderboardTable from "../components/LeaderboardTable"

function LeaderboardPage() {
    const [activeTab, setActiveTab] = useState("reaction");

    // Fülek (Tabok) stílusa
    const tabStyle = (isActive) => ({
        flex: 1,
        padding: "12px",
        background: isActive ? "var(--color-primary)" : "rgba(255, 255, 255, 0.05)",
        color: isActive ? "var(--color-bg)" : "var(--color-text)",
        fontWeight: "bold",
        border: "none",
        borderBottom: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
        cursor: "pointer",
        transition: "all 0.2s",
        fontSize: "var(--font-sm)",
        borderRadius: isActive ? "var(--radius) var(--radius) 0 0" : "0"
    });

    return (
        <>
            <div className="home-ambient-bg"></div>

            <section style={{ position: "relative", zIndex: 1 }}>
                <h1 style={{ color: "var(--color-text)", textShadow: "var(--glow-primary)" }}>Globális Ranglista</h1>
                <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-4)" }}>Nézd meg a legjobb eredményeket!</p>

                {/* --- FÜLEK (TABS) --- */}
                <div style={{ display: "flex", width: "100%", maxWidth: "500px", marginBottom: "var(--space-3)", borderRadius: "var(--radius) var(--radius) 0 0", overflow: "hidden", borderBottom: "1px solid var(--color-primary)" }}>
                    <button style={tabStyle(activeTab === "reaction")} onClick={() => setActiveTab("reaction")}>
                        ⚡ Reakció Teszt
                    </button>
                    <button style={tabStyle(activeTab === "aim")} onClick={() => setActiveTab("aim")}>
                        🎯 Céllövölde
                    </button>
                </div>

                {/* Itt adjuk át a gameMode prop-ot a táblázatnak! */}
                <LeaderboardTable gameMode={activeTab} />
            </section>
        </>
    )
}

export default LeaderboardPage