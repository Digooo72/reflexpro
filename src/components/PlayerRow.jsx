function PlayerRow({ player, index }){
    const isMe = player.name === "Te (Saját)"

    return(
        <tr style={{
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            // Halvány neon-kék kiemelés, ha a te sorodról van szó:
            background: isMe ? "rgba(0, 229, 255, 0.1)" : "transparent",
            transition: "background 0.2s"
        }}>
            <td style={{
                padding: "var(--space-3)",
                fontWeight: "bold",
                color: isMe ? "var(--color-primary)" : "var(--color-text-muted)"
            }}>
                #{index}
            </td>
            <td style={{
                padding: "var(--space-3)",
                fontWeight: isMe ? "bold" : "normal",
                color: "var(--color-text)"
            }}>
                {player.name}
            </td>
            <td style={{
                padding: "var(--space-3)",
                fontWeight: "bold",
                color: isMe ? "var(--color-primary)" : "var(--color-secondary)",
                textShadow: isMe ? "var(--glow-primary)" : "none"
            }}>
                {player.score} ms
            </td>
        </tr>
    )
}

export default PlayerRow