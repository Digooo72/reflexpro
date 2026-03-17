import { useState, useEffect } from "react"
import Card from "../components/Card"
import { getUserScores, deleteScore, updatePlayerNameInScores, getUserAimScores, deleteAimScore, updateScoreNote, updateAimScoreNote, saveFeedback } from "../services/scoreServices"
import { updateAuthDisplayName } from "../services/authService"

function ProfilePage() {
    const [activeTab, setActiveTab] = useState("reaction");
    const [myScores, setMyScores] = useState([])
    const [myAimScores, setMyAimScores] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {
        async function loadData() {
            if (currentUser && currentUser.username) {
                setIsLoading(true);
                const [reactionData, aimData] = await Promise.all([
                    getUserScores(currentUser.username),
                    getUserAimScores(currentUser.username)
                ]);
                setMyScores(reactionData);
                setMyAimScores(aimData);
                setIsLoading(false);
            }
        }
        loadData();
    }, [])

    // --- TÖRLÉS FUNKCIÓK ---
    async function handleDeleteReaction(scoreId) {
        if (window.confirm("Biztosan törölni szeretnéd ezt a Reakció teszt eredményt?")) {
            await deleteScore(scoreId);
            setMyScores(myScores.filter(score => score.id !== scoreId));
        }
    }

    async function handleDeleteAim(scoreId) {
        if (window.confirm("Biztosan törölni szeretnéd ezt a Céllövölde eredményt?")) {
            await deleteAimScore(scoreId);
            setMyAimScores(myAimScores.filter(score => score.id !== scoreId));
        }
    }

    // --- ÚJ: SZERKESZTÉS (UPDATE) FUNKCIÓK ---
    async function handleEditReaction(score) {
        const newNote = window.prompt("Írj egy megjegyzést a játékhoz (pl. 'Fáradtan'):", score.note || "");
        if (newNote !== null) {
            await updateScoreNote(score.id, newNote);
            setMyScores(myScores.map(s => s.id === score.id ? { ...s, note: newNote } : s));
        }
    }

    async function handleEditAim(score) {
        const newNote = window.prompt("Írj egy megjegyzést a játékhoz (pl. 'Új egérrel'):", score.note || "");
        if (newNote !== null) {
            await updateAimScoreNote(score.id, newNote);
            setMyAimScores(myAimScores.map(s => s.id === score.id ? { ...s, note: newNote } : s));
        }
    }

    // --- ÚJ: VISSZAJELZÉS KÜLDÉSE (Új Entitás használata) ---
    async function handleSendFeedback() {
        const msg = window.prompt("Írd le a véleményed a játékról vagy jelents egy hibát!");
        if (msg && msg.trim() !== "") {
            await saveFeedback(currentUser.username, msg);
            alert("Köszönjük a visszajelzést! Sikeresen elmentve az adatbázisba.");
        }
    }

    async function handleChangeName() {
        const newName = window.prompt("Add meg az új felhasználónevedet:", currentUser.username);
        if (newName && newName.trim() !== "" && newName !== currentUser.username) {
            try {
                setIsLoading(true);
                await updateAuthDisplayName(newName);
                await updatePlayerNameInScores(currentUser.username, newName);
                const updatedUser = { ...currentUser, username: newName };
                localStorage.setItem("currentUser", JSON.stringify(updatedUser));
                window.location.reload();
            } catch (error) {
                alert("Hiba történt a név módosításakor!");
                setIsLoading(false);
            }
        }
    }

    if (!currentUser) return <h2 style={{ textAlign: "center", color: "var(--color-accent)", marginTop: "100px" }}>Nincs jogosultságod!</h2>

    // --- MATEK ---
    const playCount = myScores.length;
    const bestTime = playCount > 0 ? Math.min(...myScores.map(s => s.score)) : "-";
    const avgTime = playCount > 0 ? Math.round(myScores.reduce((acc, curr) => acc + curr.score, 0) / playCount) : "-";

    const aimPlayCount = myAimScores.length;
    const bestAimTime = aimPlayCount > 0 ? Math.min(...myAimScores.map(s => s.score)) : "-";
    const avgAimTime = aimPlayCount > 0 ? Math.round(myAimScores.reduce((acc, curr) => acc + curr.score, 0) / aimPlayCount) : "-";
    const avgAccuracy = aimPlayCount > 0 ? Math.round(myAimScores.reduce((acc, curr) => acc + (curr.accuracy || 100), 0) / aimPlayCount) : "-";

    const tabStyle = (isActive) => ({
        flex: 1, padding: "12px", background: isActive ? "var(--color-primary)" : "rgba(255, 255, 255, 0.05)",
        color: isActive ? "var(--color-bg)" : "var(--color-text)", fontWeight: "bold", border: "none",
        borderBottom: isActive ? "none" : "1px solid rgba(255,255,255,0.1)", cursor: "pointer",
        transition: "all 0.2s", borderRadius: isActive ? "var(--radius) var(--radius) 0 0" : "0",
        fontSize: "var(--font-sm)"
    });

    return (
        <>
            <div className="home-ambient-bg"></div>

            <section style={{ position: "relative", zIndex: 1, paddingBottom: "var(--space-6)" }}>
                <h1 style={{ color: "var(--color-primary)", textShadow: "var(--glow-primary)", textAlign: "center", marginBottom: "8px" }}>
                    {currentUser.username} Profilja
                </h1>

                <div style={{ textAlign: "center", marginBottom: "var(--space-4)" }}>
                    <button onClick={handleChangeName} style={{ background: "transparent", border: "1px solid var(--color-primary)", color: "var(--color-primary)", fontSize: "0.8rem", padding: "6px 16px", borderRadius: "var(--radius-full)", marginRight: "8px" }}>
                        ✏️ Név megváltoztatása
                    </button>
                    {/* ÚJ VISSZAJELZÉS GOMB */}
                    <button onClick={handleSendFeedback} style={{ background: "transparent", border: "1px solid var(--color-secondary)", color: "var(--color-secondary)", fontSize: "0.8rem", padding: "6px 16px", borderRadius: "var(--radius-full)" }}>
                        💡 Visszajelzés küldése
                    </button>
                </div>

                <div style={{ display: "flex", width: "100%", maxWidth: "600px", margin: "0 auto var(--space-4) auto", borderRadius: "var(--radius) var(--radius) 0 0", overflow: "hidden", borderBottom: "1px solid var(--color-primary)" }}>
                    <button style={tabStyle(activeTab === "reaction")} onClick={() => setActiveTab("reaction")}>⚡ Reakció Teszt</button>
                    <button style={tabStyle(activeTab === "aim")} onClick={() => setActiveTab("aim")}>🎯 Céllövölde</button>
                </div>

                {isLoading ? (
                    <p style={{ textAlign: "center", color: "var(--color-primary)" }}>Adatok betöltése folyamatban... ⏳</p>
                ) : (
                    <>
                        {/* REAKCIÓ TESZT NÉZET */}
                        {activeTab === "reaction" && (
                            <div style={{ animation: "fadeInUp 0.3s ease" }}>
                                <div className="grid">
                                    <Card title="Személyes Legjobb"><p style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--color-primary)' }}>{bestTime} {bestTime !== "-" && "ms"}</p></Card>
                                    <Card title="Átlagos Reakcióidő"><p style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--color-secondary)' }}>{avgTime} {avgTime !== "-" && "ms"}</p></Card>
                                    <Card title="Lejátszott játékok"><p style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--color-text)' }}>{playCount}</p></Card>
                                </div>
                                <h2 style={{ marginTop: "var(--space-5)" }}>Reakció Játéktörténet</h2>
                                {playCount === 0 ? <p style={{ color: "var(--color-text-muted)" }}>Még nincs eredményed.</p> : (
                                    <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--color-surface)", borderRadius: "var(--radius)", overflow: "hidden" }}>
                                        <thead style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                                        <tr><th style={{ padding: "12px", textAlign: "left" }}>Dátum & Megjegyzés</th><th style={{ padding: "12px", textAlign: "left" }}>Eredmény</th><th style={{ padding: "12px", textAlign: "right" }}>Művelet</th></tr>
                                        </thead>
                                        <tbody>
                                        {myScores.map(score => (
                                            <tr key={score.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                                <td style={{ padding: "12px", color: "var(--color-text-muted)" }}>
                                                    {new Date(score.played_at).toLocaleString('hu-HU')}
                                                    {/* MEGJEGYZÉS KIÍRÁSA */}
                                                    {score.note && <div style={{ fontSize: "0.85rem", color: "var(--color-secondary)", marginTop: "4px" }}>💬 {score.note}</div>}
                                                </td>
                                                <td style={{ padding: "12px", color: "var(--color-primary)", fontWeight: "bold" }}>{score.score} ms</td>
                                                <td style={{ padding: "12px", textAlign: "right", display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                                                    {/* SZERKESZTÉS GOMB */}
                                                    <button onClick={() => handleEditReaction(score)} style={{ background: "transparent", color: "var(--color-primary)", border: "1px solid var(--color-primary)", padding: "4px 8px", fontSize: "0.8rem", borderRadius: "4px" }}>Megjegyzés</button>
                                                    <button onClick={() => handleDeleteReaction(score.id)} style={{ background: "transparent", color: "#ff0055", border: "1px solid #ff0055", padding: "4px 8px", fontSize: "0.8rem", borderRadius: "4px" }}>Törlés</button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}

                        {/* CÉLLÖVÖLDE NÉZET */}
                        {activeTab === "aim" && (
                            <div style={{ animation: "fadeInUp 0.3s ease" }}>
                                <div className="grid">
                                    <Card title="Legjobb Célpontidő"><p style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--color-primary)' }}>{bestAimTime} {bestAimTime !== "-" && "ms"}</p></Card>
                                    <Card title="Összesített Átlagidő"><p style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--color-primary)' }}>{avgAimTime} {avgAimTime !== "-" && "ms"}</p></Card>
                                    <Card title="Átlagos Pontosság"><p style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--color-secondary)' }}>{avgAccuracy} {avgAccuracy !== "-" && "%"}</p></Card>
                                    <Card title="Lejátszott játékok"><p style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold', color: 'var(--color-text)' }}>{aimPlayCount}</p></Card>
                                </div>
                                <h2 style={{ marginTop: "var(--space-5)" }}>Céllövölde Történet</h2>
                                {aimPlayCount === 0 ? <p style={{ color: "var(--color-text-muted)" }}>Még nincs eredményed.</p> : (
                                    <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--color-surface)", borderRadius: "var(--radius)", overflow: "hidden" }}>
                                        <thead style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                                        <tr><th style={{ padding: "12px", textAlign: "left" }}>Dátum & Megjegyzés</th><th style={{ padding: "12px", textAlign: "left" }}>Átlag idő</th><th style={{ padding: "12px", textAlign: "left" }}>Pontosság</th><th style={{ padding: "12px", textAlign: "right" }}>Művelet</th></tr>
                                        </thead>
                                        <tbody>
                                        {myAimScores.map(score => (
                                            <tr key={score.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                                <td style={{ padding: "12px", color: "var(--color-text-muted)" }}>
                                                    {new Date(score.played_at).toLocaleString('hu-HU')}
                                                    {/* MEGJEGYZÉS KIÍRÁSA */}
                                                    {score.note && <div style={{ fontSize: "0.85rem", color: "var(--color-secondary)", marginTop: "4px" }}>💬 {score.note}</div>}
                                                </td>
                                                <td style={{ padding: "12px", color: "var(--color-primary)", fontWeight: "bold" }}>{score.score} ms</td>
                                                <td style={{ padding: "12px", color: score.accuracy === 100 ? "var(--color-secondary)" : "var(--color-text)", fontWeight: "bold" }}>{score.accuracy || 100}%</td>
                                                <td style={{ padding: "12px", textAlign: "right", display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                                                    {/* SZERKESZTÉS GOMB */}
                                                    <button onClick={() => handleEditAim(score)} style={{ background: "transparent", color: "var(--color-primary)", border: "1px solid var(--color-primary)", padding: "4px 8px", fontSize: "0.8rem", borderRadius: "4px" }}>Megjegyzés</button>
                                                    <button onClick={() => handleDeleteAim(score.id)} style={{ background: "transparent", color: "#ff0055", border: "1px solid #ff0055", padding: "4px 8px", fontSize: "0.8rem", borderRadius: "4px" }}>Törlés</button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}
                    </>
                )}
            </section>
        </>
    )
}

export default ProfilePage