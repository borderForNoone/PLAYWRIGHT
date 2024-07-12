const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const RegistrationPage = require('../pages/RegistrationPage');

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();
});

test('Check that the error message appears when register with invalid values', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const homePage = new HomePage(page);

  await homePage.clickRegistrationButton();
  await registrationPage.clickSubmitButton();

  await registrationPage.waitForErrorMessage();

  const isErrorVisible = await registrationPage.errorMessage.isVisible();
  expect(isErrorVisible).toBe(true);
});

test('Short password should show error message', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const homePage = new HomePage(page);

  await homePage.clickRegistrationButton();
  
  await registrationPage.register('testuser', 'short', 'short', 'test@example.com');

  expect(await registrationPage.usernameInput.inputValue()).toBe('testuser');
  expect(await registrationPage.emailInput.inputValue()).toBe('test@example.com');

  expect(await registrationPage.isPasswordHidden()).toBe(true);
  expect(await registrationPage.isPasswordConfirmationHidden()).toBe(true);

  await registrationPage.waitForErrorMessage();

  const isErrorVisible = await registrationPage.errorMessage.isVisible();
  expect(isErrorVisible).toBe(true);

  const errorMessageText = await registrationPage.getErrorMessageText();
  expect(errorMessageText).toContain('Password is too short (minimum is 8 characters)');
});

test('A long nickname should cause an error', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const homePage = new HomePage(page);

  await homePage.clickRegistrationButton();
  
  await registrationPage.register(
    'a'.repeat(61), 
    'Pass1',   
    'Pass1', 
    'email@example.com'
  );

  expect(await registrationPage.usernameInput.inputValue()).toBe('a'.repeat(61));
  expect(await registrationPage.emailInput.inputValue()).toBe('email@example.com');

  expect(await registrationPage.isPasswordHidden()).toBe(true);
  expect(await registrationPage.isPasswordConfirmationHidden()).toBe(true);

  await registrationPage.waitForErrorMessage();

  const isErrorVisible = await registrationPage.errorMessage.isVisible();
  expect(isErrorVisible).toBe(true);

  const errorMessageText = await registrationPage.getErrorMessageText();
  expect(errorMessageText).toContain('Login is too long (maximum is 60 characters)');
});
