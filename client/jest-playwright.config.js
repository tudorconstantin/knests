// https://github.com/playwright-community/jest-playwright/#configuration
module.exports = {
  // browsers: ["firefox", "webkit"],
  browsers: ['chromium'],
  collectCoverage: true,
  serverOptions: {
    command: `node server.js`,
    port: process.env.OWN_PORT || 8080,
    launchTimeout: 10000,
    debug: true,
    options: {
        env: {
            'BROWSER': 'none',
            'USE_BABEL_PLUGIN_ISTANBUL': 'TRUE',
        },
    },
},
  launchOptions: {
    args: [
      `--no-sandbox`,
    ],
  },
};