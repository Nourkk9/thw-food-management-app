describe("Material-Einkaufsliste", () => {
  const testMaterial = "Testmaterial_Automation";

  it("legt ein Material an, ändert dessen Status und entfernt es anschließend", () => {
    // Anwendung öffnen und zur Material-Einkaufsliste navigieren
    cy.visit("/");
    cy.contains("a", "Material-Einkaufsliste").click();

    // Definierten Ausgangszustand prüfen
    cy.contains(testMaterial).should("not.exist");

    // Formular öffnen
    cy.contains("button", "Material hinzufügen").click();

    // Testdaten eingeben
    cy.contains("label", "Materialname")
      .find("input")
      .type(testMaterial);

    cy.contains("label", "Kategorie")
      .parent()
      .find("select")
      .select("Reinigungsmittel");

    cy.contains("label", "Zuständige Person")
      .parent()
      .find("input")
      .type("Testperson");

    cy.contains("label", "Menge")
      .parent()
      .find("input")
      .clear()
      .type("5");

    cy.contains("label", "Einheit")
      .find("select")
      .select("Stück");

    cy.contains("label", "Status")
      .find("select")
      .find("option:selected")
      .should("have.text", "Offen");

    cy.contains("label", "Hinweis")
      .parent()
      .find("textarea")
      .type("Automatisierter Test");

    // Material anlegen
    cy.contains("button", "Hinzufügen").click();

    // Angelegten Eintrag prüfen
    cy.contains("tr", testMaterial).within(() => {
      cy.contains(testMaterial).should("be.visible");
      cy.contains("Reinigungsmittel").should("be.visible");
      cy.contains("5").should("be.visible");
      cy.contains("Stück").should("be.visible");
      cy.contains("Offen").should("be.visible");
    });

    // Status ändern
    cy.contains("tr", testMaterial).within(() => {
      cy.get("select").select("Wird besorgt");
      cy.contains("Wird besorgt").should("be.visible");
    });

    // Testeintrag löschen
    cy.contains("tr", testMaterial).within(() => {
      cy.contains("button", "Löschen").click();
    });

    // Endzustand prüfen
    cy.contains("tr", testMaterial).should("not.exist");
  });
});