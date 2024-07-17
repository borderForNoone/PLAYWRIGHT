const Page = require('./Page');

class RegistrationPage extends Page {
    constructor(page) {
        super(page);

        this.usernameInput = page.locator('#user_login');
        this.passwordInput = page.locator('#user_password');
        this.passwordConfirmationInput = page.locator('#user_password_confirmation');
        this.emailInput = page.locator('#user_mail');
        this.submitButton = page.locator('input[type="submit"]');
        this.errorMessage = page.locator('#errorExplanation');
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    async getErrorMessageText() {
        return await this.errorMessage.textContent();
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
}

module.exports = RegistrationPage;