import { browser, $, $$, expect } from '@wdio/globals'

describe('Electron Testing', () => {

    it('should add a new questionnaire', async () => {
        const toggleButton = await $('.add-project-header .button-icon')
        await toggleButton.click()

        const inputField = await $('#questionnaireName')
        await inputField.waitForDisplayed()  // Wait for input to be displayed
        await inputField.setValue('New Test Questionnaire')

        const addButton = await $('.add-button')
        await expect(addButton).toBeEnabled()
        await addButton.click()

        // Verify new questionnaire appears in the table
        const addedQuestionnaire = await $(`//span[contains(text(), 'New Test Questionnaire')]`)
        await expect(addedQuestionnaire).toBeDisplayed()
    })

    it('should navigate when clicking "See More" button', async () => {
        const seeMoreButton = await $('.see-more-button')
        await expect(seeMoreButton).toBeDisplayed()
        await seeMoreButton.click()

        // Example verification that URL has changed
        const currentUrl = await browser.getUrl()
        expect(currentUrl).toContain('questionnaireId')
    })

    it('should interact with the menu actions', async () => {
        const menuButton = await $('app-menu')
        await expect(menuButton).toBeDisplayed()
        await menuButton.click()

        // Example: Assume the first action button in the menu should be visible after clicking
        const firstMenuAction = await $('//app-menu//button[1]')
        await expect(firstMenuAction).toBeDisplayed()
    })
    it('should toggle column visibility', async () => {
        const toggleButton = await browser.$('.toggle-column-btn');
        await expect(toggleButton).toBeDisplayed();
        await toggleButton.click();
        await browser.pause(1000);
    });

    it('should change row color selection', async () => {
        const changeColorButton = await browser.$('.toggle-button');
        await expect(changeColorButton).toBeDisplayed();
        await changeColorButton.click();
        const colorOption = await browser.$('.textarea-color-option');
        await colorOption.click();
    });

    it('should add and delete a row', async () => {
        const addRowButton = await browser.$('.add-row-button');
        await expect(addRowButton).toBeDisplayed();
        await addRowButton.click();

        const deleteRowButton = await browser.$('.delete-row-button');
        await expect(deleteRowButton).toBeDisplayed();
        await deleteRowButton.click();
    });

    it('should toggle project panel visibility', async () => {
        const toggleProjectsButton = await browser.$('button[aria-label*="hidePanels.ariaLabel"]');
        await expect(toggleProjectsButton).toBeDisplayed();
        await toggleProjectsButton.click();
    });

    it('should switch tabs', async () => {
        const tabs = await browser.$$('.tabs');
        if (tabs.length > 1) {
            await tabs[1].click();
            await browser.pause(1000);
            await tabs[0].click();
        }
    });
})
