const { test, expect } = require("@playwright/test");

test.describe("Rezepte", () => {
  const testRezept = "E2E-Testrezept";

  test(
    "legt ein Rezept an, ändert dessen Kochzeit und entfernt es anschließend",
    async ({ page }) => {
      // Rezepte öffnen
      await page.goto("/");
      await page.getByRole("link", { name: "Rezepte" }).click();

      // Vorbedingung prüfen
      await expect(page.getByText(testRezept)).toHaveCount(0);

      // Neues Rezept öffnen
      await page.getByRole("button", { name: "Neues Rezept" }).click();

      let dialog = page.getByRole("dialog");

      // Rezept anlegen

      // Name
      await dialog.locator("input").nth(0).fill(testRezept);

      // Kategorie
      await dialog
        .locator("select")
        .nth(0)
        .selectOption({ label: "Frühstück" });

      // Beschreibung
      await dialog
        .locator("textarea")
        .first()
        .fill("Automatisiertes E2E-Testrezept");

      // Basis-Personen
      await dialog.locator("input").nth(1).fill("10");

      // Kochzeit
      await dialog.locator("input").nth(2).fill("30");

      // Zutat
      await dialog.locator("input").nth(3).fill("E2E-Testzutat");

      // Menge
      await dialog.locator("input").nth(4).fill("1");

      // Einheit
      await dialog
        .locator("select")
        .nth(1)
        .selectOption({ label: "kg" });

      await dialog.getByRole("button", { name: "Speichern" }).click();

      // Angelegtes Rezept über die Suche eindeutig auswählen
      const searchInput = page.locator(
        'input[placeholder="Rezept oder Zutat suchen..."]'
      );

      await searchInput.fill(testRezept);

      // Anlage prüfen
      const recipeCard = page
        .getByRole("article")
        .filter({ hasText: testRezept });

      await expect(
        recipeCard.getByRole("heading", {
          name: testRezept,
          exact: true,
        })
      ).toBeVisible();

      await expect(
        recipeCard.getByText("Frühstück", { exact: true })
      ).toBeVisible();

      await expect(
        recipeCard.getByText("Basis: 10 Personen", { exact: true })
      ).toBeVisible();

      await expect(
        recipeCard.getByText("30 Min.", { exact: true })
      ).toBeVisible();

      await expect(
        recipeCard.getByText("E2E-Testzutat")
      ).toBeVisible();

      // Details öffnen
      await recipeCard
        .getByRole("button", { name: "Details" })
        .click();

      dialog = page.getByRole("dialog");

      await expect(
        dialog.getByText(testRezept, { exact: true })
      ).toBeVisible();

      await expect(
        dialog.getByText("10", { exact: true })
      ).toBeVisible();

      await expect(
        dialog.getByText("30 Minuten", { exact: true })
      ).toBeVisible();

      await expect(
        dialog.getByText("E2E-Testzutat", { exact: true })
      ).toBeVisible();

      // Bearbeitung öffnen
      await dialog
        .getByRole("button", { name: "Bearbeiten" })
        .click();

      dialog = page.getByRole("dialog");

      // Kochzeit ändern
      await dialog.locator("input").nth(2).fill("45");

      await dialog
        .getByRole("button", { name: "Speichern" })
        .click();

      // Änderung prüfen
      await searchInput.fill(testRezept);

      const updatedRecipeCard = page
        .getByRole("article")
        .filter({ hasText: testRezept });

      await expect(
        updatedRecipeCard.getByRole("heading", {
          name: testRezept,
          exact: true,
        })
      ).toBeVisible();

      await expect(
        updatedRecipeCard.getByText("45 Min.", { exact: true })
      ).toBeVisible();

      // Rezept erneut öffnen
      await updatedRecipeCard
        .getByRole("button", { name: "Details" })
        .click();

      dialog = page.getByRole("dialog");

      await expect(
        dialog.getByText(testRezept, { exact: true })
      ).toBeVisible();

      await expect(
        dialog.getByText("45 Minuten", { exact: true })
      ).toBeVisible();

      // Rezept löschen
      await dialog
        .getByRole("button", { name: "Löschen" })
        .click();

      // Löschung prüfen
      await expect(
        page.getByRole("heading", {
          name: testRezept,
          exact: true,
        })
      ).toHaveCount(0);

      await expect(
        page.getByText(
          "Keine Rezepte für die aktuelle Suche oder den gewählten Filter gefunden.",
          { exact: true }
        )
      ).toBeVisible();
    }
  );
});