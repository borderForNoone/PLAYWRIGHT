const Page = require('./Page');

class SearchPage extends Page {
    constructor(page) {
        super(page);

        this.searchResultsHeading = page.locator('//h3[contains(text(), "Results")]');
    }
}

module.exports = SearchPage;