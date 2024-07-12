const Page = require('./Page');

class SearchPage extends Page {
    constructor(page) {
        super(page);
    }

    searchResultsHeading() {
        return this.page.locator('//h3[contains(text(), "Results")]'); 
    }
    
    async getSearchResultsHeadingText() {
        const heading = this.searchResultsHeading();
        return await heading.textContent(); 
    }

    async getSearchFieldValue() {
        return await super.getSearchFieldValue();
    }
}

module.exports = SearchPage;