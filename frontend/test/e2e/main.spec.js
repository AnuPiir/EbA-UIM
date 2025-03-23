// frontend/test/e2e/app.spec.js
const { Application } = require('spectron');
const { assert } = require('chai');
const electronPath = require('electron');
const path = require('path');

describe('My Electron App', function() {
    this.timeout(10000);

    let app;

    beforeEach(async function() {
        app = new Application({
            path: electronPath,
            // VERY IMPORTANT: Adjust the path to your Electron app!
            args: [path.join(__dirname, '../../')], // Since main.js is in frontend/
            startTimeout: 10000,
            waitTimeout: 10000
        });
        await app.start();
    });

    afterEach(async function() {
        if (app && app.isRunning()) {
            await app.stop();
        }
    });

    it('should launch and show the main window', async function() {
        const count = await app.client.getWindowCount();
        assert.equal(count, 1);
    });

    // ... more E2E tests, using app.client.$ to interact with the UI ...
    it('clicks a button and updates text', async function () {
        // Find a button by its CSS selector (you'll need to inspect your Angular app)
        await app.client.$('#myButton').click();

        // Wait for the text to change (use a specific selector)
        const text = await app.client.$('#resultText').getText();
        assert.equal(text, 'Button Clicked!'); // Replace with expected text
    });

    it('fills out a form', async function() {
        await app.client.$('#nameInput').setValue('John Doe');
        await app.client.$('#emailInput').setValue('john.doe@example.com');
        await app.client.$('#submitButton').click();

        const successMessage = await app.client.$('#successMessage').getText();
        assert.equal(successMessage, 'Form submitted successfully!');
    });

    it('handles an error', async function() {
        //Simulate error, no email
        await app.client.$('#nameInput').setValue('John Doe');
        await app.client.$('#submitButton').click();
        const errorMessage = await app.client.$('#errorMessage').getText();
        assert.equal(errorMessage, "Email is required")
    })
});