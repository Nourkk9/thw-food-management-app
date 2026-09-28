describe("Material-Einkaufsliste", () => {
  const testMaterial = "E2E-Testmaterial";

  it("legt ein Material an, ändert dessen Status und entfernt es anschließend", () => {
    // Anwendung öffnen und zur Material-Einkaufsliste navigieren
    cy.visit("/");
    cy.contains("a", "Material-Einkaufsliste").click();

    // Definierten Ausgangszustand prüfen
    cy.contains(testMaterial).should("not.exist");

    // Formular öffnen
    cy.contains("button", "Material hinzufügen").click();

    // Materialname
    cy.contains("label", "Materialname") .parent().find("input").first().type(testMaterial);

    // Kategorie
    cy.contains("label", "Kategorie").parent().find("select").first().select("Küchenartikel");

    // Zuständige Person
    cy.contains("label", "Zuständige Person").parent().find("input").first().type("Testperson");

    // Menge
    cy.contains("label", "Menge").parent().find("input").first().clear().type("2");

    // Einheit
    cy.contains("label", "Einheit").parent().find("select").first().select("Stück");

    // Ausgangsstatus prüfen
    cy.contains("label", "Status").parent().find("select").first().should("have.value", "Offen");

    // Hinweis
    cy.contains("label", "Hinweis").parent().find("textarea").first().type("Automatisierter E2E-Test");

    // Material anlegen
    cy.contains("button", "Hinzufügen").click();

    // Angelegten Eintrag prüfen
    cy.contains("tr", testMaterial).within(() => {
      cy.contains(testMaterial).should("be.visible");
      cy.contains("Küchenartikel").should("be.visible");
      cy.contains("2").should("be.visible");
      cy.contains("Stück").should("be.visible");
      cy.contains("Testperson").should("be.visible");
      cy.contains("Offen").should("be.visible");
    });

    // Status ändern
    cy.contains("tr", testMaterial).within(() => {
      cy.get("select").first().select("Wird besorgt").should("have.value", "Erledigt");
    });

    // Statusänderung prüfen
    cy.contains("tr", testMaterial).contains("Wird besorgt").should("be.visible");

    // Testeintrag löschen
    cy.contains("tr", testMaterial).within(() => {
      cy.contains("button", "Löschen").click();
    });

    // Löschung prüfen
    cy.contains("tr", testMaterial).should("not.exist");
  });
});