const Page = require('./Page');

class HomePage extends Page {
    constructor(page) {
        super(page);
    } 

    async open() {
        await super.open('/');
    }

    async search(query) {
        await super.search(query);
    }

    async clickRegistrationButton() {
        await super.clickRegistrationButton();
    }
}

module.exports = HomePage;