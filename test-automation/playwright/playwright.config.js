const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./e2e",

  // Reguläre Mess- und Stabilitätsläufe bewusst seriell
  workers: 1,

  // Keine automatischen Wiederholungen
  retries: 0,

  use: {
    baseURL: "http://localhost:3000",

    // Identische Viewport-Bedingung wie bei Cypress
    viewport: {
      width: 1536,
      height: 960,
    },

    // Reguläre Messläufe ohne sichtbare Browseroberfläche
    headless: true,

    // Installiertes Google Chrome verwenden
    channel: "chrome",
  },
});