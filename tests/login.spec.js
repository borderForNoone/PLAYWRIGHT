const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const invalidUsername = 'invalid_user';
const invalidPassword = 'invalid_password';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
});

test('Check that the error message appears when login with invalid values', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.clickLoginButton(); 
    await loginPage.login(invalidUsername, invalidPassword); 

    const enteredUsername = await loginPage.getUsernameValue();
    expect(enteredUsername).toBe(invalidUsername);

    const isPasswordHidden = await loginPage.isPasswordHidden();
    expect(isPasswordHidden).toBe(true);

    const errorMessage = await page.locator('.flash.error').textContent();
    expect(errorMessage).toContain('Invalid user or password');
});