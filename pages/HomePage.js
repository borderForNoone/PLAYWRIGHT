const Page = require('./Page');

class HomePage extends Page {
    constructor(page) {
        super(page);
    } 

    async open() {
        await super.open('/');
    }
}

module.exports = HomePage;