const { test, expect } = require("@playwright/test");

test.describe("Material-Einkaufsliste", () => {
  const testMaterial = "E2E-Testmaterial";

  test("legt ein Material an, ändert dessen Status und entfernt es anschließend", async ({ page }) => {
    await page.goto("/");

    // Material-Einkaufsliste öffnen
    await page
      .getByRole("link", { name: "Material-Einkaufsliste" })
      .click();

    // Ausgangszustand prüfen
    await expect(page.getByText(testMaterial)).toHaveCount(0);

    // Dialog öffnen
    await page
    .getByRole("button", { name: "Material hinzufügen" })
    .click();

    const dialog = page.getByRole("dialog");

    // Testdaten eingeben
    await dialog.getByLabel("Materialname").fill(testMaterial);

    await dialog
    .getByLabel("Kategorie")
    .selectOption({ label: "Küchenartikel" });

    await dialog
    .getByLabel("Zuständige Person")
    .fill("Testperson");

    await dialog
    .getByLabel("Menge")
    .fill("2");

    await dialog
    .getByLabel("Einheit")
    .selectOption({ label: "Stück" });

    await expect(
    dialog.getByLabel("Status")
    ).toHaveValue("Offen");

    await dialog
    .getByLabel("Hinweis")
    .fill("Automatisierter E2E-Test");

    await dialog
    .getByRole("button", { name: "Hinzufügen" })
    .click();

    // Anlage prüfen
    const row = page
      .getByRole("row")
      .filter({ hasText: testMaterial });

    await expect(row).toContainText(testMaterial);
    await expect(row).toContainText("Küchenartikel");
    await expect(row).toContainText("2");
    await expect(row).toContainText("Stück");
    await expect(row).toContainText("Testperson");
    await expect(row).toContainText("Offen");

    // Status ändern
    const statusSelect = row.locator("select").first();

    await statusSelect.selectOption({ label: "Wird besorgt" });

    // Pause nur zur Untersuchung der Debugging-Funktion
    //await page.pause();

    // Absichtlich falsche Assertion für den Debugging-Test
    await expect(statusSelect).toHaveValue("Erledigt");

    // Material löschen
    await row
      .getByRole("button", { name: "Löschen" })
      .click();

    // Löschung prüfen
    await expect(
      page.getByRole("row").filter({ hasText: testMaterial })
    ).toHaveCount(0);
  });
});