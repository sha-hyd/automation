'user strict';

var Logger = require('../helper/logger.js');
var Common = require('../helper/common.js');
var HomePage = require('../pages/homePage.js');

var common = new Common(),
    logger = new Logger(),
    homePage = new HomePage(),
    loadBegin,
    testBegin;

describe('Demo', function() {

    beforeEach(function () {
        loadBegin = logger.loading();
        common.load();
    });

    afterEach(function () {
        logger.finish(loadBegin, testBegin);
    });

    it('Search', function () {
        var searchText = 'surface';
        testBegin = logger.begin('Search test');
        logger.log('inputting search text');
        homePage.getSearchInput().sendKeys(searchText).then(function () {
            logger.log('clicking search button');
            return homePage.getSearchButton().click();
        }).then(function () {
            logger.log('verifying search results panel to be visible');
            expect(homePage.getSearchResultsPanel().isDisplayed()).toBe(true);
        }).then(function () {
            logger.log('getting search results count');
            return homePage.getSearchResults().count();
        }).then(function (count) {
            logger.log('verifying search results count > 0');
            expect(count).toBeGreaterThan(0);
        });
    });
});