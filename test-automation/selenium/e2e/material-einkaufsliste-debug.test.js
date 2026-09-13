const assert = require("node:assert/strict");
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const config = require("../selenium.config");
const testMaterial = "E2E-Testmaterial";
const fs = require("node:fs");
const path = require("node:path");

// Viewport exakt auf die festgelegte Größe einstellen
async function setExactViewport(driver) {
  for (let i = 0; i < 3; i++) {
    const size = await driver.executeScript(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }));

    if (
      size.width === config.viewport.width &&
      size.height === config.viewport.height
    ) {
      return;
    }

    const rect = await driver.manage().window().getRect();

    await driver.manage().window().setRect({
      width:
        rect.width +
        (config.viewport.width - size.width),
      height:
        rect.height +
        (config.viewport.height - size.height),
    });
  }

  const actual = await driver.executeScript(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  assert.equal(
    actual.width,
    config.viewport.width,
    "Viewport-Breite stimmt nicht überein."
  );

  assert.equal(
    actual.height,
    config.viewport.height,
    "Viewport-Höhe stimmt nicht überein."
  );
}

async function runTest() {
  const options = new chrome.Options();

  if (config.headless) {
    options.addArguments(
      "--headless=new",
      "--force-device-scale-factor=1"
    );
  }

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  const find = (xpath) =>
    driver.wait(
      until.elementLocated(By.xpath(xpath)),
      config.timeout
    );

  const field = (label, tag) =>
    find(
      `//label[contains(.,"${label}")]/..//${tag}[1]`
    );

  try {
    // Anwendung öffnen
    await driver.get(config.baseUrl);

    // Einheitlichen Viewport sicherstellen
    await setExactViewport(driver);

    // Viewport für den Probe-Run dokumentieren
    const viewport = await driver.executeScript(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }));

    // Material-Einkaufsliste öffnen
    await (
      await find(
        '//a[contains(.,"Material-Einkaufsliste")]'
      )
    ).click();

    // Ausgangszustand prüfen
    assert.equal(
      (
        await driver.findElements(
          By.xpath(
            `//*[normalize-space(.)="${testMaterial}"]`
          )
        )
      ).length,
      0
    );

    // Dialog öffnen
    await (
      await find(
        '//button[normalize-space(.)="Material hinzufügen"]'
      )
    ).click();

    // Testdaten eingeben
    await (
      await field("Materialname", "input")
    ).sendKeys(testMaterial);

    await (
      await field("Kategorie", "select")
    ).sendKeys("Küchenartikel");

    await (
      await field("Zuständige Person", "input")
    ).sendKeys("Testperson");

    const menge = await field("Menge", "input");
    await menge.clear();
    await menge.sendKeys("2");

    await (
      await field("Einheit", "select")
    ).sendKeys("Stück");

    const status = await field("Status", "select");

    assert.equal(
      await status.getAttribute("value"),
      "Offen"
    );

    await (
      await field("Hinweis", "textarea")
    ).sendKeys("Automatisierter E2E-Test");

    // Material speichern
    await (
      await find(
        '//div[@role="dialog"]//button[normalize-space(.)="Hinzufügen"]'
      )
    ).click();

    // Anlage prüfen
    const row = await find(
      `//tr[contains(.,"${testMaterial}")]`
    );

    const rowText = await row.getText();

    for (const value of [
      testMaterial,
      "Küchenartikel",
      "2",
      "Stück",
      "Testperson",
      "Offen",
    ]) {
      assert.ok(
        rowText.includes(value),
        `"${value}" wurde im Datensatz nicht gefunden.`
      );
    }

    // Status ändern
    const rowStatus = await row.findElement(
      By.css("select")
    );

    await rowStatus.sendKeys("Wird besorgt");

    // Statusänderung prüfen
    await driver.wait(
      async () =>
        (await rowStatus.getAttribute("value")) ===
        "Wird besorgt",
      config.timeout
    );

    // Absichtlich falsche Assertion für den Debugging-Test
    assert.equal(
    await rowStatus.getAttribute("value"),
    "Erledigt",
    "Absichtlich falsche Assertion für den Debugging-Test."
    );

    // Material löschen
    await (
      await row.findElement(
        By.xpath(
          './/button[normalize-space(.)="Löschen"]'
        )
      )
    ).click();

    // Löschung prüfen
    await driver.wait(
      async () =>
        (
          await driver.findElements(
            By.xpath(
              `//tr[contains(.,"${testMaterial}")]`
            )
          )
        ).length === 0,
      config.timeout
    );

    assert.equal(
      (
        await driver.findElements(
          By.xpath(
            `//tr[contains(.,"${testMaterial}")]`
          )
        )
      ).length,
      0
    );

    console.log(
      "PASS: Material-Einkaufsliste erfolgreich getestet."
    );
    } catch (error) {
    const screenshotDir = path.resolve(
      __dirname,
      "../screenshots"
    );

    fs.mkdirSync(screenshotDir, {
      recursive: true,
    });

    const screenshot = await driver.takeScreenshot();

    const screenshotPath = path.join(
      screenshotDir,
      "selenium-debug-failure.png"
    );

    fs.writeFileSync(
      screenshotPath,
      screenshot,
      "base64"
    );

    console.log(
      `Screenshot gespeichert: ${screenshotPath}`
    );

    throw error;
  } finally {
    await driver.quit();
  }
}

runTest().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});