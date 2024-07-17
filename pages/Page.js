class Page {
    constructor(page) {
        this.page = page;

        this.searchField = page.locator('#q');
        this.loginButton = page.locator('a[class="login"]');
        this.registrationButton = page.locator('a[class = "register"]');
    }

    async open(path) {
        await this.page.goto(`${path}`);
    }

    async search(query) {
        await this.searchField.fill(query);
        await this.searchField.press('Enter');
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async getSearchFieldValue() {
        return await this.searchField.inputValue();
    }

    async clickRegistrationButton() {
        await this.registrationButton.click();
    }
}

module.exports = Page;
