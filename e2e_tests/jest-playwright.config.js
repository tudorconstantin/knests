// https://github.com/playwright-community/jest-playwright/#configuration
module.exports = {
  // browsers: ["firefox", "webkit"],
  browsers: ["chromium"],
  collectCoverage: true,
  launchOptions: {
    args: [
      `--no-sandbox`,
    ],
  }
}