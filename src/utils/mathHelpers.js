// src/utils/mathHelpers.js

// Kiszámolja egy számokat tartalmazó tömb átlagát.
// Ha a tömb üres, 0-t ad vissza.
export function calculateAverage(numbers) {
    if (!numbers || numbers.length === 0) return 0;

    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return Math.round(sum / numbers.length);
}