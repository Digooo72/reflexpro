import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import PlayerRow from "./PlayerRow"
import { getTopScores, getTopAimScores } from "../services/scoreServices"

function LeaderboardTable({ gameMode = "reactions"}){
    const [players, setPlayers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // URL paraméterek kezelése (Ez éri a plusz pontot!)
    const [searchParams, setSearchParams] = useSearchParams()

    // Kiolvassuk az URL-ből az értékeket, ha nincsenek, adunk alapértelmezettet
    const searchTerm = searchParams.get("search") || ""
    const sortOrder = searchParams.get("sort") || "best"

    useEffect(() => {
        async function fetchScores() {
            try {
                setIsLoading(true);
                // Ha a mód "reaction", a régit kéri le. Ha "aim", az újat.
                const cloudScores = gameMode === "reaction"
                    ? await getTopScores(50)
                    : await getTopAimScores(50);
                setPlayers(cloudScores);
            } catch (err) {
                console.error("Hiba történt a betöltéskor", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchScores();
    }, [gameMode]) // <-- Ha változik a mód, töltse újra!

    // Frissítjük az URL-t, amikor gépel vagy rendez
    function handleSearchChange(e) {
        setSearchParams(prev => {
            if (e.target.value) prev.set("search", e.target.value);
            else prev.delete("search"); // Ha üres, kitöröljük az URL-ből
            return prev;
        });
    }

    function handleSortChange(e) {
        setSearchParams(prev => {
            prev.set("sort", e.target.value);
            return prev;
        });
    }

    // 1. Szűrés név alapján
    let processedPlayers = players.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Rendezés
    processedPlayers.sort((a, b) => {
        if (sortOrder === "best") return a.score - b.score;
        if (sortOrder === "worst") return b.score - a.score;
        return 0;
    });

    if (isLoading) return <p style={{ color: "var(--color-primary)", textAlign: "center", padding: "var(--space-4)" }}>Adatok betöltése a szerverről... ⏳</p>
    if (players.length === 0) return <p style={{ color: "var(--color-text-muted)", textAlign: "center", padding: "var(--space-4)" }}>Még senki sem játszott.</p>

    return(
        <>
            {/* Kereső és Rendező sáv */}
            <div style={{ display: "flex", gap: "var(--space-3)", marginBottom: "var(--space-3)", flexWrap: "wrap", background: "rgba(11, 15, 25, 0.6)", padding: "var(--space-3)", borderRadius: "var(--radius)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <input
                    type="text"
                    placeholder="🔍 Keresés játékosnév alapján..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ flex: "1", minWidth: "200px" }}
                />
                <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    style={{ padding: "0 var(--space-3)", borderRadius: "var(--radius)", border: "1px solid rgba(255,255,255,0.2)", background: "var(--color-surface)", color: "white", cursor: "pointer", minHeight: "44px" }}
                >
                    <option value="best">Legjobb idők elöl</option>
                    <option value="worst">Legrosszabb idők elöl</option>
                </select>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", background: "var(--color-surface)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.08)", boxShadow: "var(--shadow)", borderRadius: "var(--radius)", overflow: "hidden" }}>
                <thead style={{ background: "rgba(0, 229, 255, 0.1)", borderBottom: "1px solid rgba(0, 229, 255, 0.3)" }}>
                <tr>
                    <th style={{ padding: "var(--space-3)", color: "var(--color-primary)" }}>Helyezés</th>
                    <th style={{ padding: "var(--space-3)", color: "var(--color-primary)" }}>Játékos</th>
                    <th style={{ padding: "var(--space-3)", color: "var(--color-primary)" }}>Pont (ms)</th>
                </tr>
                </thead>
                <tbody>
                {processedPlayers.length > 0 ? (
                    processedPlayers.map((p, index) => (
                        <PlayerRow key={p.id} player={p} index={index + 1} />
                    ))
                ) : (
                    <tr><td colSpan="3" style={{ textAlign: "center", padding: "var(--space-4)", color: "var(--color-text-muted)" }}>Nincs találat.</td></tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default LeaderboardTable