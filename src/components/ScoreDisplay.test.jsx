import { render, screen } from '@testing-library/react';
import ScoreDisplay from './ScoreDisplay';

describe('ScoreDisplay Komponens', () => {
    test('Megjeleníti a "Reakcióidő:" feliratot', () => {
        render(<ScoreDisplay time={250} />);
        // /.../ jelekkel keresünk (Regex), így megtalálja a feldarabolt szövegben is
        expect(screen.getByText(/Reakcióidő:/)).toBeInTheDocument();
    });

    test('Helyesen jeleníti meg a kapott időt', () => {
        render(<ScoreDisplay time={342} />);
        expect(screen.getByText(/342/)).toBeInTheDocument();
    });

    test('Nem jelenik meg semmi, ha nincs megadva idő', () => {
        // Mivel a kódodban ott van: if(!time) return null; Ezt zseniálisan tudjuk tesztelni!
        const { container } = render(<ScoreDisplay time={null} />);
        expect(container).toBeEmptyDOMElement();
    });
});