describe('Claculator', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('shows default calculation', () => {
		cy.get('[data-test=matrix] input').should('have.length', 16);
		cy.get('[data-test=kernel] input').should('have.length', 9);
		cy.get('[data-test=result] input').should('have.length', 16);
	});

	it('shows result when matrix changes', () => {
		cy.get('[data-test=matrix] input').first().type(2);
		cy.get('[data-test=result] input').first().should('have.value', 5);
	});

	it('shows result when kernel changes', () => {
		cy.get('[data-test=kernel] input').first().type(2);
		cy.get('[data-test=result] input').last().should('have.value', 5);
	});

	it('can change matrix size', () => {
		cy.get('[data-test=matrix-size] input').first().type(2);
		cy.get('[data-test=matrix-size] input').last().type(2);
		cy.get('[data-test=matrix] input').should('have.length', 4);
	});

	it('can change kernel size', () => {
		cy.get('[data-test=kernel-size] input').first().type(2);
		cy.get('[data-test=kernel-size] input').last().type(2);
		cy.get('[data-test=kernel] input').should('have.length', 4);
	});

	it('can toggle padding', () => {
		cy.get('[data-test=padding]').click();
		cy.get('[data-test=result] input').should('have.length', 4);
	});
});
