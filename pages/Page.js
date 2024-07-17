class Page {
    constructor(page) {
        this.page = page;
    }

    async open(path) {
        await this.page.goto(`/${path}`);
    }

    get searchField() {
        return this.page.locator('#q');
    }

    async search(query) {
        await this.searchField.fill(query);
        await this.searchField.press('Enter');
    }

    get loginButton() {
        return this.page.locator('a[class="login"]');
    }

    get registrationButton() {
        return this.page.locator('a[class = "register"]');
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
