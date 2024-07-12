// @ts-check
const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const SearchPage = require('../pages/SearchPage');

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();
});

test('Search for a query', async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  await homePage.search('ASDASDASDADASD');

  const searchFieldValue = await searchPage.getSearchFieldValue();
  expect(searchFieldValue).toBe('ASDASDASDADASD');

  const headingText = await searchPage.getSearchResultsHeadingText();
  expect(headingText).toContain('Results (0)'); 
});