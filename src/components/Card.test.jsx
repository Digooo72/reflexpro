import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card Komponens', () => {
    test('Megjeleníti a kártya címét (title)', () => {
        render(<Card title="Teszt Cím">Tartalom</Card>);
        expect(screen.getByText('Teszt Cím')).toBeInTheDocument();
    });

    test('Megjeleníti a kártya belső tartalmát (children)', () => {
        render(<Card title="Teszt Cím">Ez itt a kártya belső szövege</Card>);
        expect(screen.getByText('Ez itt a kártya belső szövege')).toBeInTheDocument();
    });
});