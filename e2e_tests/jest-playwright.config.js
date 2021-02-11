// https://github.com/playwright-community/jest-playwright/#configuration
module.exports = {
  // browsers: ["firefox", "webkit"],
  browsers: ["chromium"],
  // browsers: ["firefox"],
  collectCoverage: true,
  launchOptions: {
    args: [
      `--no-sandbox`,
      '--disable-setuid-sandbox',
    ],
    headless: true
  }
}