import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// 5 db előre beállított Ambiens Fény Preset
const presets = [
    { c1: "rgba(139, 92, 246, 0.4)", c2: "rgba(0, 229, 255, 0.4)" },  // 1. Lila - Cián (Alap)
    { c1: "rgba(59, 130, 246, 0.4)", c2: "rgba(236, 72, 153, 0.4)" },  // 2. Kék - Pink
    { c1: "rgba(16, 185, 129, 0.4)", c2: "rgba(234, 179, 8, 0.4)" },   // 3. Zöld - Sárga (Toxic)
    { c1: "rgba(239, 68, 68, 0.4)", c2: "rgba(249, 115, 22, 0.4)" },   // 4. Piros - Narancs (Tűz)
    { c1: "rgba(148, 163, 184, 0.4)", c2: "rgba(100, 116, 139, 0.4)" } // 5. Monokróm / Szürke (Fókusz)
];

function ThemeController() {
    const [isLight, setIsLight] = useState(false);
    const [presetIndex, setPresetIndex] = useState(0);
    const location = useLocation();

    // 1. Ha változik a Light/Dark mód, rárakjuk a <body>-ra a taget
    useEffect(() => {
        if (isLight) {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    }, [isLight]);

    // 2. Ha változik a preset, átírjuk a globális CSS változókat
    useEffect(() => {
        const currentPreset = presets[presetIndex];
        document.documentElement.style.setProperty("--ambient-color-1", currentPreset.c1);
        document.documentElement.style.setProperty("--ambient-color-2", currentPreset.c2);
    }, [presetIndex]);

    // Gombnyomás kezelők
    const toggleTheme = () => setIsLight(!isLight);
    const cyclePreset = () => setPresetIndex((prev) => (prev + 1) % presets.length);

    // --- ÚJ LOGIKA: Csak a Reakció Tesztnél rejtjük el a palettát ---
    const searchParams = new URLSearchParams(location.search);
    const isReactionGame = location.pathname === "/game" && searchParams.get("mode") === "reaction";

    return (
        <div style={{
            position: "fixed",
            bottom: "var(--space-4)",
            right: "var(--space-4)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
            zIndex: 9999
        }}>

            {/* Ambiens Fény Váltó (Elrejtjük, ha a Reakció Teszt megy) */}
            {!isReactionGame && (
                <button
                    onClick={cyclePreset}
                    title="Ambiens fény váltása"
                    style={{
                        width: "50px", height: "50px", borderRadius: "50%",
                        padding: 0, display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "24px", opacity: 0.9
                    }}
                >
                    🎨
                </button>
            )}

            {/* Sötét / Világos Mód Váltó */}
            <button
                onClick={toggleTheme}
                title="Világos / Sötét mód"
                style={{
                    width: "50px", height: "50px", borderRadius: "50%",
                    padding: 0, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "24px", opacity: 0.9
                }}
            >
                {isLight ? "🌙" : "☀️"}
            </button>

        </div>
    )
}

export default ThemeController;