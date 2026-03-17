import { useState, useEffect } from "react"
import Card from "../components/Card"

const funFacts = [
    "A vizuális ingerekre adott átlagos emberi reakcióidő 250-300 milliszekundum.",
    "A hanghatásokra adott válaszidő jellemzően gyorsabb, mint a vizuális ingereké.",
    "A profi e-sportolók reakcióideje gyakran 150-200 milliszekundum környékén mozog.",
    "A pislogás reflexe mindössze 100 milliszekundum alatt megy végbe, ez a testünk egyik leggyorsabb mozgása.",
    "A rendszeres testmozgás és a jó minőségű alvás bizonyítottan javítja a reakcióidőt.",
    "A kor előrehaladtával a reflexeink lassan romlanak – a csúcsteljesítményt nagyjából 24 éves korban érjük el.",
    "A tapintási ingerekre reagálunk a leggyorsabban, átlagosan 150 ms alatt.",
    "A fényviszonyok megváltozására adott első reakció a pupillareflex, amely nagyon gyors, de a tudatos vizuális reakcióidő általában hosszabb."

];

function HomePage() {
    const [factIndex, setFactIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFactIndex((prevIndex) => (prevIndex + 1) % funFacts.length);
        }, 9500);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="home-ambient-bg"></div>

            <section style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
                <h1 style={{
                    textAlign: "center",
                    color: "var(--color-text)",
                    textShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                    marginBottom: 0
                }}>
                    Üdvözöl a Reflex Teszt Játék!
                </h1>

                {/* --- KÁRTYÁK FELSŐ SORA --- */}
                <div className="grid">
                    <Card title="🎮 Játék" to="/game">
                        Tedd próbára a reflexeidet! Kattints a zöld célpontra amilyen gyorsan csak tudsz.
                    </Card>

                    <Card title="🏆 Ranglista" to="/leaderboard">
                        Nézd meg a globális toplistát és hasonlítsd össze az idődet a többiekkel.
                    </Card>

                    <Card title="📊 Statisztika" to="/profile">
                        Lépj be a profilodba, és kövesd nyomon a korábbi eredményeidet, fejlődésedet.
                    </Card>
                </div>

                {/* --- FUN FACT SZEKCIÓ (MÁR LENT VAN ÉS FIX MAGASSÁGÚ) --- */}
                <div style={{
                    maxWidth: "800px",
                    width: "100%",
                    margin: "0 auto",
                    padding: "var(--space-3) var(--space-4)",
                    background: "var(--color-funfact-bg)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    borderLeft: "4px solid var(--color-primary)",
                    borderRadius: "0 var(--radius) var(--radius) 0",
                    boxShadow: "var(--shadow)",
                    // EZ A KULCS: A minHeight megakadályozza, hogy ugráljon az oldal!
                    minHeight: "140px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                    <h3 style={{ color: "var(--color-primary)", fontSize: "var(--font-sm)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "var(--space-2)" }}>
                        💡 Tudtad?
                    </h3>

                    <p key={factIndex} style={{
                        color: "var(--color-text-muted)",
                        fontStyle: "italic",
                        fontSize: "var(--font-md)",
                        animation: "fadeInUp 0.5s ease-out",
                        margin: 0 // Levesszük az alap margót, hogy középre rendeződjön
                    }}>
                        „{funFacts[factIndex]}”
                    </p>
                </div>
            </section>
        </>
    )
}

export default HomePage