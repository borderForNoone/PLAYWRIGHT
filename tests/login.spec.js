const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const { loginErrorMessage } = require('../constants/endpoints.constants.json');

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

    expect(await loginPage.usernameInput.inputValue()).toBe(invalidUsername);

    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');

    expect(await loginPage.errorMessage.textContent()).toContain(loginErrorMessage);
});