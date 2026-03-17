// src/utils/mathHelpers.test.js
import { expect, test, describe } from 'vitest';
import { calculateAverage } from './mathHelpers';

// A "describe" egy csoportba fogja a teszteket
describe('calculateAverage függvény tesztelése', () => {

    test('Helyesen kiszámolja pozitív számok átlagát', () => {
        const numbers = [100, 200, 300];
        const result = calculateAverage(numbers);
        expect(result).toBe(200); // Elvárjuk, hogy az eredmény 200 legyen
    });

    test('Tört szám esetén helyesen kerekít', () => {
        const numbers = [100, 150]; // (100+150)/2 = 125
        const result = calculateAverage(numbers);
        expect(result).toBe(125);
    });

    test('Üres tömb esetén 0-t ad vissza (ne legyen hiba)', () => {
        const numbers = [];
        const result = calculateAverage(numbers);
        expect(result).toBe(0);
    });
});