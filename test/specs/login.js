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

    it('Login', function () {
        testBegin = logger.begin('Login test');

        logger.log('login with account');
        common.login().then(function () {
            logger.log('Wait account icon to be visible');
            return common.waitForElementVisibility(homePage.getAccountIcon());
        }).then(function () {
            logger.log('Click icon to open account dropdown');
            return homePage.getAccountIcon().click();
        }).then(function () {
            logger.log('getting account text');
            return homePage.getAccountNameFromDropDown().getText();
        }).then(function (text) {
            logger.log('verifying the account name');
            expect(text).toEqual(browser.params.login.userName);
        });
    });
});