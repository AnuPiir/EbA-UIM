// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './test/e2e', // Adjust path as needed
    timeout: 30 * 1000, // Adjust as needed
    expect: {
        timeout: 5000, // Adjust as needed
    },
    use: {
        //BaseURL
        baseURL: 'http://localhost:4200', //Adjust as needed
        trace: 'on',
        // Run browser in headless mode.
        headless: false,
    },
    // Configure projects for major browsers.
    projects: [
        {
            name: 'Desktop Chromium',
            use: {
                ...devices['Desktop Chrome'],
                channel: 'chrome',
            },
        },
    ],

});