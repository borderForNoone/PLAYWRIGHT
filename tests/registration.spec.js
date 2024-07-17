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
  await registrationPage.submitButton.click();

  expect(await registrationPage.errorMessage.isVisible()).toBe(true);
});

test('Short password should show error message', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const homePage = new HomePage(page);

  await homePage.clickRegistrationButton();
  
  await registrationPage.register('testuser', 'short', 'short', 'test@example.com');

  expect(await registrationPage.usernameInput.inputValue()).toBe('testuser');
  expect(await registrationPage.emailInput.inputValue()).toBe('test@example.com');

  await expect(registrationPage.passwordInput).toHaveAttribute('type', 'password');
  await expect(registrationPage.passwordConfirmationInput).toHaveAttribute('type', 'password');

  expect(await registrationPage.errorMessage.isVisible()).toBe(true);

  expect(await registrationPage.errorMessage.textContent()).toContain('Password is too short (minimum is 8 characters)');
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

  await expect(registrationPage.passwordInput).toHaveAttribute('type', 'password');
  await expect(registrationPage.passwordConfirmationInput).toHaveAttribute('type', 'password');

  expect(await registrationPage.errorMessage.isVisible()).toBe(true);

  expect(await registrationPage.getErrorMessageText()).toContain('Login is too long (maximum is 60 characters)');
});
