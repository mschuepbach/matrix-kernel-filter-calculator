const visit = (darkAppearance) =>
	cy.visit('/', {
		onBeforeLoad(win) {
			cy.stub(win, 'matchMedia')
				.withArgs('(prefers-color-scheme: dark)')
				.returns({
					matches: darkAppearance,
					addEventListener: () => {},
					removeEventListener: () => {}
				});
		}
	});

const isDarkMode = () => {
	cy.get('html').should('have.attr', 'theme', 'dark');
	cy.get('html').should('have.css', 'background-color', 'rgb(34, 34, 34)');
	cy.get('html').should('have.css', 'color', 'rgb(238, 238, 238)');
};

const isLightMode = () => {
	cy.get('html').should('have.attr', 'theme', 'light');
	cy.get('html').should('have.css', 'background-color', 'rgb(255, 255, 255)');
	cy.get('html').should('have.css', 'color', 'rgb(34, 34, 34)');
};

describe('Theme', () => {
	it('is light if preferred', () => {
		visit(false);
		isLightMode();
	});

	it('is dark if preferred', () => {
		visit(true);
		isDarkMode();
	});

	it('can toggle', () => {
		visit(false);
		isLightMode();
		cy.get('[data-test=toggle-theme]').click();
		isDarkMode();
		cy.get('[data-test=toggle-theme]').click();
		isLightMode();
	});
});
