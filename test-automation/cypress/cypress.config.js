const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1536,
  viewportHeight: 960,

  retries: {
    runMode: 0,
    openMode: 0,
  },

  e2e: {
    baseUrl: "http://localhost:3000",
  },
});