import { render, screen } from '@testing-library/react';
import ReactionTarget from './ReactionTarget';

describe('ReactionTarget Komponens', () => {
    test('Alapállapotban (idle) a "START" feliratot mutatja', () => {
        render(<ReactionTarget state="idle" onClick={() => {}} />);
        expect(screen.getByText('START')).toBeInTheDocument();
    });

    test('Készenléti állapotban (ready) a "KATTINTS!" feliratot mutatja', () => {
        render(<ReactionTarget state="ready" onClick={() => {}} />);
        expect(screen.getByText('KATTINTS!')).toBeInTheDocument();
    });
});