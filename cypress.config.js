const { defineConfig } = require("cypress");
const { isFileExist } = require("cy-verify-downloads");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    baseUrl: "https://www.automationexercise.com/",
    includeShadowDom: true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    chromeWebSecurity: true,
    video: false,
    setupNodeEvents(on, config) {
      on("task", { isFileExist });
      require("cypress-mochawesome-reporter/plugin")(on);
      // implement node event listeners here
    },
  },
});
