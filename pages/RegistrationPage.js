const Page = require('./Page');

class RegistrationPage extends Page {
    constructor(page) {
        super(page);
    }

    get usernameInput() {
        return this.page.locator('#user_login');
    }

    get passwordInput() {
        return this.page.locator('#user_password');
    }

    get passwordConfirmationInput() {
        return this.page.locator('#user_password_confirmation');
    }

    get emailInput() {
        return this.page.locator('#user_mail');
    }

    get submitButton() {
        return this.page.locator('input[type="submit"]');
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    get errorMessage() {
        return this.page.locator('#errorExplanation');
    }

    async getErrorMessageText() {
        return await this.errorMessage.textContent();
    }

    async waitForErrorMessage() {
        await this.page.waitForSelector('#errorExplanation', { state: 'visible' });
    }

    async fillRegistrationForm(username, password, passwordConfirmation, email) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.passwordConfirmationInput.fill(passwordConfirmation);
        await this.emailInput.fill(email);
    }

    async register(username, password, passwordConfirmation, email) {
        await this.fillRegistrationForm(username, password, passwordConfirmation, email);
        await this.clickSubmitButton();
    }

    async isPasswordHidden() {
        return (await this.passwordInput.getAttribute('type')) === 'password';
    }

    async isPasswordConfirmationHidden() {
        return (await this.passwordConfirmationInput.getAttribute('type')) === 'password';
    }
}

module.exports = RegistrationPage;