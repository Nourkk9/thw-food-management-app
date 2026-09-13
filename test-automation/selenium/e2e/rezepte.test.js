const assert = require("node:assert/strict");
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const config = require("../selenium.config");

const testRezept = "E2E-Testrezept";

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

  assert.equal(actual.width, config.viewport.width);
  assert.equal(actual.height, config.viewport.height);
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

  try {
    await driver.get(config.baseUrl);
    await setExactViewport(driver);

    // Rezepte öffnen
    await (
      await find('//a[contains(.,"Rezepte")]')
    ).click();

    // Ausgangszustand prüfen
    assert.equal(
      (
        await driver.findElements(
          By.xpath(
            `//*[normalize-space(.)="${testRezept}"]`
          )
        )
      ).length,
      0
    );

    // Neues Rezept öffnen
    await (
      await find(
        '//button[normalize-space(.)="Neues Rezept"]'
      )
    ).click();

    let dialog = await find('//*[@role="dialog"]');

    let inputs = await dialog.findElements(By.css("input"));
    let selects = await dialog.findElements(By.css("select"));
    let textareas = await dialog.findElements(By.css("textarea"));

    // Rezept anlegen
    await inputs[0].sendKeys(testRezept);
    await selects[0].sendKeys("Frühstück");

    await textareas[0].sendKeys(
      "Automatisiertes E2E-Testrezept"
    );

    await inputs[1].clear();
    await inputs[1].sendKeys("10");

    await inputs[2].clear();
    await inputs[2].sendKeys("30");

    await inputs[3].sendKeys("E2E-Testzutat");

    await inputs[4].clear();
    await inputs[4].sendKeys("1");

    await selects[1].sendKeys("kg");

    await (
      await dialog.findElement(
        By.xpath(
          './/button[normalize-space(.)="Speichern"]'
        )
      )
    ).click();

    // Rezept suchen
    const search = await find(
      '//input[@placeholder="Rezept oder Zutat suchen..."]'
    );

    await search.clear();
    await search.sendKeys(testRezept);

    // Rezeptkarte bestimmen
    let card = await find(
      `//article[contains(.,"${testRezept}")]`
    );

    // Anlage prüfen
    let cardText = await card.getText();

    for (const value of [
      testRezept,
      "Frühstück",
      "Basis: 10 Personen",
      "30 Min.",
      "E2E-Testzutat",
    ]) {
      assert.ok(
        cardText.includes(value),
        `"${value}" wurde nicht gefunden.`
      );
    }

    // Details öffnen
    await (
      await card.findElement(
        By.xpath(
          './/button[normalize-space(.)="Details"]'
        )
      )
    ).click();

    dialog = await find('//*[@role="dialog"]');

    let dialogText = await dialog.getText();

    assert.ok(dialogText.includes(testRezept));
    assert.ok(dialogText.includes("10"));
    assert.ok(dialogText.includes("30 Minuten"));
    assert.ok(dialogText.includes("E2E-Testzutat"));

    // Bearbeitung öffnen
    await (
      await dialog.findElement(
        By.xpath(
          './/button[normalize-space(.)="Bearbeiten"]'
        )
      )
    ).click();

    dialog = await find('//*[@role="dialog"]');
    inputs = await dialog.findElements(By.css("input"));

    // Kochzeit 30 -> 45 ändern
    await inputs[2].clear();
    await inputs[2].sendKeys("45");

    await (
      await dialog.findElement(
        By.xpath(
          './/button[normalize-space(.)="Speichern"]'
        )
      )
    ).click();

    // Änderung prüfen
    await search.clear();
    await search.sendKeys(testRezept);

    card = await find(
      `//article[contains(.,"${testRezept}")]`
    );

    cardText = await card.getText();

    assert.ok(cardText.includes("45 Min."));

    // Rezept erneut öffnen
    await (
      await card.findElement(
        By.xpath(
          './/button[normalize-space(.)="Details"]'
        )
      )
    ).click();

    dialog = await find('//*[@role="dialog"]');
    dialogText = await dialog.getText();

    assert.ok(dialogText.includes(testRezept));
    assert.ok(dialogText.includes("45 Minuten"));

    // Rezept löschen
    await (
      await dialog.findElement(
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
              `//h2[normalize-space(.)="${testRezept}"]`
            )
          )
        ).length === 0,
      config.timeout
    );

    const emptyMessage = await find(
      '//*[contains(.,"Keine Rezepte für die aktuelle Suche oder den gewählten Filter gefunden.")]'
    );

    assert.ok(await emptyMessage.isDisplayed());

    console.log(
      "PASS: Rezepte-Test erfolgreich getestet."
    );
  } finally {
    await driver.quit();
  }
}

runTest().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});