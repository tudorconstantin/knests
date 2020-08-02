// https://github.com/playwright-community/jest-playwright/#configuration
module.exports = {
  browsers: ["chromium", "firefox", "webkit"],
  serverOptions: {
      command: "npm start",
      port: 3000,
      launchTimeout: 10000,
      debug: true,
      options: {
        env: {
          E2E_TESTS: "true"
        }
      }
  },
  collectCoverage: true
}