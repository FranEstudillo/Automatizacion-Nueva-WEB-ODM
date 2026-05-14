describe("Nueva Página WEB ODM - TPX", () => {
  beforeEach(() => {
    // Ignorar errores no capturados de la app para que no fallen los tests
    Cypress.on("uncaught:exception", () => false);
    cy.visit("https://venta-dev.odm.com.mx/home");
  });

  it("Comité ODM - TPX", () => {
    // Carga de la página
    cy.visit("https://venta-dev.odm.com.mx/home");
    // Espera para carga del logo
    cy.wait(4000);
    // Seleccionar origen
    cy.get("#originInput").click();
    cy.get("p-selectitem").contains("MEXICO CENTRAL NORTE").click();
    // Seleccionar destino
    cy.get("#destinationInput").click();
    cy.get("p-selectitem").contains("AGUASCALIENTES C. AUTOBUS").click();
    // Seleccionar fecha
    cy.get("#dateInput > input.p-datepicker-input").click();

    cy.get(".p-datepicker-calendar td")
      .not(".p-datepicker-other-month")
      .contains("15")
      .click();

    cy.pause();

    // Seleccionar pasajeros
    cy.get("#passengersInput").click();
    // cy.get("div.passengers-selector").should("be.visible");
    cy.get("div.passenger-type")
      .contains("Adulto")
      .nextAll(".col")
      .eq(2)
      .click();

    // Buscar corridas
    cy.get(".odm-button").click();
  });
});
