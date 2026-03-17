import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        setError(null);

        // Kliens-oldali validáció (UX pont)
        if (password.length < 6) {
            setError("A jelszónak legalább 6 karakter hosszúnak kell lennie!");
            return;
        }

        try {
            setIsLoading(true);
            // 1. Firebase regisztráció
            const user = await registerUser(email, password, username);

            // 2. Mivel a Firebase Email auth alapból nem kér felhasználónevet,
            // elmentjük localStorage-ba, hogy a játék/ranglista tudja, ki vagy.
            localStorage.setItem("currentUser", JSON.stringify({
                username: username,
                email: user.email,
                uid: user.uid
            }));

            // 3. Átirányítás a főoldalra
            window.location.href = "/";
        } catch (err) {
            setError("Sikertelen regisztráció! Lehet, hogy ez az e-mail már foglalt.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="home-ambient-bg"></div>
            <section style={{ maxWidth: '400px', margin: 'auto', position: 'relative', zIndex: 1, background: 'var(--color-surface)', backdropFilter: 'blur(12px)', padding: 'var(--space-4)', borderRadius: 'var(--radius)', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: 'var(--shadow)' }}>
                <h1 style={{ textAlign: 'center', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>Regisztráció</h1>

                {error && <p style={{ color: "var(--color-accent)", textAlign: "center", marginBottom: "var(--space-3)" }}>❌ {error}</p>}

                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <input type="text" placeholder="Felhasználónév (Játékban látható)" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="email" placeholder="E-mail cím" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Jelszó (min. 6 karakter)" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" disabled={isLoading} style={{ marginTop: 'var(--space-2)' }}>
                        {isLoading ? "Fiók létrehozása..." : "Regisztrálok"}
                    </button>
                </form>

                <p style={{ marginTop: 'var(--space-4)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                    Már van fiókod? <a href="/login" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 'bold' }}>Lépj be!</a>
                </p>
            </section>
        </>
    )
}

export default RegisterPage