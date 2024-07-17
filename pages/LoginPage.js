const Page = require('./Page');

class LoginPage extends Page {
    constructor(page) {
        super(page);

        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButtonLocator = page.locator('input[name="login"]');
        this.errorMessage = page.locator('.flash.error');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButtonLocator.click();
    }
}

module.exports = LoginPage;
