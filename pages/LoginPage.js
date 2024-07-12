const Page = require('./Page');

class LoginPage extends Page {
    constructor(page) {
        super(page);
    }

    async login(username, password) {
        await this.page.fill(this.usernameInput(), username);
        await this.page.fill(this.passwordInput(), password);
        await this.page.click(this.loginButton());
    }

    usernameInput() {
        return '#username';
    }

    passwordInput() {
        return '#password';
    }

    loginButton() {
        return 'input[name="login"]';
    }

    async getUsernameValue() {
        return await this.page.inputValue(this.usernameInput());
    }

    async isPasswordHidden() {
        return await this.page.$eval(this.passwordInput(), input => input.type === 'password');
    }
}

module.exports = LoginPage;
