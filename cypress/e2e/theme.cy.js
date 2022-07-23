const visit = (darkAppearance) =>
  cy.visit("/", {
    onBeforeLoad(win) {
      cy.stub(win, "matchMedia")
        .withArgs("(prefers-color-scheme: dark)")
        .returns({
          matches: darkAppearance,
          addEventListener: () => {},
          removeEventListener: () => {},
        });
    },
  });

const isDarkMode = () => {
  cy.get("html").should("have.attr", "theme", "dark");
  cy.get("html").should("have.css", "background-color", "rgb(51, 51, 51)");
  cy.get("html").should("have.css", "color", "rgb(238, 238, 238)");
};

const isLightMode = () => {
  cy.get("html").should("have.attr", "theme", "light");
  cy.get("html").should("have.css", "background-color", "rgb(255, 255, 255)");
  cy.get("html").should("have.css", "color", "rgb(51, 51, 51)");
};

describe("Theme", () => {
  it("is dark by default", () => {
    cy.visit("/");
    isDarkMode();
  });

  it("is light if user has set it in the browser", () => {
    visit(false);
    isLightMode();
  });

  it("can toggle", () => {
    visit(true);
    isDarkMode();
    cy.get("[data-test=toggle-theme]").click();
    isLightMode();
    cy.get("[data-test=toggle-theme]").click();
    isDarkMode();
  });
});
