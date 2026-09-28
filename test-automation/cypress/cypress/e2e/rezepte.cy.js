describe("Rezepte", () => {
  const testRezept = "E2E-Testrezept";

  it("legt ein Rezept an, ändert dessen Kochzeit und entfernt es anschließend", () => {
    // Rezepte öffnen
    cy.visit("/");
    cy.contains("a", "Rezepte").click();

    // Vorbedingung prüfen
    cy.contains(testRezept).should("not.exist");

    // Neues Rezept öffnen
    cy.contains("button", "Neues Rezept").click();

    // Rezept anlegen
    cy.get('[role="dialog"]').within(() => {
      // Name
      cy.get("input").eq(0).type(testRezept);

      // Kategorie
      cy.get("select").eq(0).select("Frühstück");

      // Beschreibung
      cy.get("textarea").first().type("Automatisiertes E2E-Testrezept");

      // Basis-Personen
      cy.get("input").eq(1).clear().type("10");

      // Kochzeit
      cy.get("input").eq(2).clear().type("30");

      // Zutat
      cy.get("input").eq(3).type("E2E-Testzutat");

      // Menge
      cy.get("input").eq(4).clear().type("1");

      // Einheit
      cy.get("select").eq(1).select("kg");

      cy.contains("button", "Speichern").click();
    });

    // Angelegtes Rezept über die Suche eindeutig auswählen
    cy.get('input[placeholder="Rezept oder Zutat suchen..."]').clear().type(testRezept);

    // Anlage prüfen
    cy.contains(testRezept).should("be.visible");
    cy.contains("Frühstück").should("be.visible");
    cy.contains("Basis: 10 Personen").should("be.visible");
    cy.contains("30 Min.").should("be.visible");
    cy.contains("E2E-Testzutat").should("be.visible");

    // Details öffnen
    cy.contains("button", "Details").click();

    cy.get('[role="dialog"]').within(() => {
      cy.contains(testRezept).should("be.visible");
      cy.contains("10").should("be.visible");
      cy.contains("30 Minuten").should("be.visible");
      cy.contains("E2E-Testzutat").should("be.visible");

      // Bearbeitung öffnen
      cy.contains("button", "Bearbeiten").click();
    });

    // Kochzeit ändern
    cy.get('[role="dialog"]').within(() => {
    cy.get("input").eq(2).clear().type("45");
    cy.contains("button", "Speichern").click();
    });

    // Änderung prüfen
    cy.get('input[placeholder="Rezept oder Zutat suchen..."]').clear().type(testRezept);

    cy.contains(testRezept).should("be.visible");
    cy.contains("45 Min.").should("be.visible");

    // Rezept erneut öffnen
    cy.contains("button", "Details").click();

    cy.get('[role="dialog"]').within(() => {
      cy.contains(testRezept).should("be.visible");
      cy.contains("45 Minuten").should("be.visible");

      // Rezept löschen
      cy.contains("button", "Löschen").click();
    });

    // Löschung prüfen
    cy.contains("h2", testRezept).should("not.exist");
    cy.contains(
    "Keine Rezepte für die aktuelle Suche oder den gewählten Filter gefunden."
    ).should("be.visible");
  });
});