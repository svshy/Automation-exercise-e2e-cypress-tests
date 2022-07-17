const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.automationexercise.com/",
    includeShadowDom: true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    chromeWebSecurity: true,
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
