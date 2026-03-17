import { Link } from "react-router-dom"

function Card({ title, children, to }) {
    const cardStyle = {
        background: "var(--color-surface)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "var(--space-4)",
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
        display: "block",
        textDecoration: "none",
        color: "var(--color-text-muted)",
        transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        height: "100%"
    }

    if (to) {
        return (
            <Link
                to={to}
                style={cardStyle}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                    e.currentTarget.style.boxShadow = 'var(--glow-primary)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = 'var(--shadow)';
                }}
            >
                <h2 style={{ color: "var(--color-text)", marginBottom: "var(--space-2)" }}>{title}</h2>
                {/* <p> HELYETT <div> LETT: */}
                <div>{children}</div>
            </Link>
        )
    }

    return (
        <article style={cardStyle}>
            <h2 style={{ color: "var(--color-text)", marginBottom: "var(--space-2)" }}>{title}</h2>
            {/* <p> HELYETT <div> LETT: */}
            <div>{children}</div>
        </article>
    )
}

export default Card