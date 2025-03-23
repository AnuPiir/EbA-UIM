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

})
