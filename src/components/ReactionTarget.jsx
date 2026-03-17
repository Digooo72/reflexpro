function ReactionTarget({ state, onClick }) {
    let text = "START"
    let bgColor = "var(--color-surface)"
    let textColor = "var(--color-primary)"
    let glow = "none"
    let animation = "none"
    let border = "2px solid var(--color-primary)"

    if (state === "waiting") {
        text = "VÁRJ..."
        bgColor = "transparent"
        textColor = "var(--color-accent)"
        border = "2px solid var(--color-accent)"
        animation = "pulseDanger 1.5s infinite" // A global.css-ben definiáltuk

    }
    else if (state === "ready") {
        text = "KATTINTS!"
        bgColor = "var(--color-secondary)"
        textColor = "#000" // Fekete szöveg a neon zöldön a kontrasztért
        border = "none"
        glow = "var(--glow-secondary)"
    }
    else if (state === "finished") {
        text = "KÉSZ! ÚJ KÖR?"
        bgColor = "var(--color-primary)"
        textColor = "#000"
        border = "none"
        glow = "var(--glow-primary)"
    }
    else if (state === "early") {
        text = "TÚL KORAI!"
        bgColor = "transparent"
        textColor = "#f59e0b" // Narancs
        border = "2px solid #f59e0b"
    }

    return (
        <button
            onClick={onClick}
            aria-label="reaction target"
            style={{
                width: "min(300px, 80vw)",
                height: "min(300px, 80vw)",
                borderRadius: "var(--radius-full)",
                fontSize: "30px",
                fontWeight: "900",
                letterSpacing: "3px",
                backgroundColor: bgColor,
                color: textColor,
                border: border,
                cursor: "pointer",
                boxShadow: glow,
                animation: animation,
                margin: "40px auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                transition: "all 0.1s ease-out",
                userSelect: "none", // Ne lehessen véletlenül kijelölni a szöveget kattintáskor
                WebkitTapHighlightColor: "transparent", // Mobilokon eltünteti a csúnya kék kattintás-kockát
                touchAction: "none"
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            {text}
        </button>



    )
}

export default ReactionTarget