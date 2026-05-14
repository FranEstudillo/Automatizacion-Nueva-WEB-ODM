describe("Comité Nueva Página WEB ODM - TPX", () => {
  beforeEach(() => {
    // Ignorar errores no capturados de la app para que no fallen los tests
    Cypress.on("uncaught:exception", () => false);
    cy.visit("https://venta-dev.odm.com.mx/home");
  });
  let origen1 = "MEXICO CENTRAL NORTE";
  let origen2 = "MEXICO, D.F.";
  let destino1 = "AGUASCALIENTES C. AUTOBUS";
  // let diaSalidaViaje = "15";

  it("Venta de Viaje Sencillo - Usuario no registrado", () => {
    // Carga de la página
    cy.visit("https://venta-dev.odm.com.mx/home");
    // Espera para carga del logo
    cy.wait(4000);
    // Seleccionar origen
    cy.get("#originInput").click();
    cy.get("p-selectitem").contains(origen2).click();
    // Seleccionar destino
    cy.get("#destinationInput").click();
    cy.get("p-selectitem").contains(destino1).click();
    // Seleccionar fecha
    cy.get("#dateInput > input.p-datepicker-input").click();

    cy.get(".p-datepicker-calendar td")
      .not(".p-datepicker-other-month")
      .contains("15")
      .click();

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

    // Seleccionar la primer corrida disponible
    cy.get("button.ticket-btn").should("be.visible");
    cy.get("button.ticket-btn").first().click();

    // Seleccionar el primer asiento disponible
    cy.wait(1000);
    cy.get('img[src="media/seat.png"]').should("be.visible");
    cy.get('img[src="media/seat.png"]').parent("div.col-9").first().click();

    // Avanzar a la personalización del asiento
    cy.get("button.btn").contains("Confirmar asientos").should("be.enabled");
    cy.get("button.btn").contains("Confirmar asientos").click();

    // Ingresar nombre del pasajero
    cy.get('input[placeholder="Nombre completo"]')
      .type("TEST PASAJERO CYPRESS")
      .blur();

    cy.wait(1000);

    // Avanzar al pago
    cy.get("button.btn").contains("Continuar").should("be.enabled");
    cy.get("button.btn").contains("Continuar").click();

    // Ingresar datos de pago
    cy.get('input[placeholder="Nombre completo"]').type(
      "TEST PASAJERO CYPRESS",
    );

    cy.get('input[placeholder="0000 0000 0000 0000"]')
      .type("4000 0000 0000 0051")
      .blur();

    cy.get('input[placeholder="MM/AA"]').type("0139");

    cy.get('input[placeholder="CVC/CVV"]').type("123");

    cy.get('input[placeholder="Escribe tu nombre"]').type(
      "TEST PASAJERO CYPRESS",
    );

    cy.get('input[placeholder="10 dígitos"]').type("5566332211");

    cy.get("input#userEmail").type("jestudillo@odm.com.mx");

    cy.get("input#confirmedEmail").type("jestudillo@odm.com.mx");

    cy.get("input#checkPrivacy").check();

    cy.get("input#checkDefault").check();

    cy.wait(1000);

    // Avanzar al pago
    cy.get("button.btn").contains("Continuar").should("be.enabled");
    cy.get("button.btn").contains("Continuar").click();

    // cy.pause();
  });
});
