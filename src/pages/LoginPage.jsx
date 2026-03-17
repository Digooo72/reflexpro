import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setError(null);

        try {
            setIsLoading(true);
            const user = await loginUser(email, password);

            // Az egyszerűség kedvéért kinyerjük a nevet az e-mailből (pl. teszt@gmail.com -> teszt)

            // Kinyerjük a VALÓDI nevet a Firebase-ből. Ha valamiért nincs, csak akkor használjuk az e-mailt.
            const realUsername = user.displayName || user.email.split('@')[0];

            localStorage.setItem("currentUser", JSON.stringify({
                username: realUsername, // <-- Itt már a valódit mentjük a memóriába
                email: user.email,
                uid: user.uid
            }));

            window.location.href = "/";
        } catch (err) {
            setError("Hibás e-mail cím vagy jelszó!");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="home-ambient-bg"></div>
            <section style={{ maxWidth: '400px', margin: 'auto', position: 'relative', zIndex: 1, background: 'var(--color-surface)', backdropFilter: 'blur(12px)', padding: 'var(--space-4)', borderRadius: 'var(--radius)', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: 'var(--shadow)' }}>
                <h1 style={{ textAlign: 'center', color: 'var(--color-primary)' }}>Belépés</h1>

                {error && <p style={{ color: "var(--color-accent)", textAlign: "center", marginBottom: "var(--space-3)", marginTop: "var(--space-3)" }}>❌ {error}</p>}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
                    <input type="email" placeholder="E-mail cím" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" disabled={isLoading} style={{ marginTop: 'var(--space-2)' }}>
                        {isLoading ? "Bejelentkezés..." : "Belépés"}
                    </button>
                </form>

                <p style={{ marginTop: 'var(--space-4)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    Nincs még fiókod? <a href="/register" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 'bold' }}>Regisztrálj!</a>
                </p>
            </section>
        </>
    )
}

export default LoginPage