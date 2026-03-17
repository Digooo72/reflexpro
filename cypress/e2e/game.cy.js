describe('ReflexPro Happy Path E2E Teszt', () => {
    it('Végigmegy a játékmód választáson és elindítja a Reakció Tesztet', () => {
        // 1. A robot megnyitja a főoldalt
        cy.visit('/');

        // 2. Rákattint a "Játék" linkre a navigációban
        cy.contains('Játék').click();

        // 3. Ellenőrzi, hogy a Játékmód választón vagyunk-e
        cy.contains('Válassz Játékmódot').should('be.visible');

        // 4. Rákattint a Reakció Teszt kártyára
        cy.contains('⚡ Reakció Teszt').click();

        // 5. Ellenőrzi, hogy betöltött-e a játék (megjelenik a START gomb)
        cy.contains('START').should('be.visible');
    });
});