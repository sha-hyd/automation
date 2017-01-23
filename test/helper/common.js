'use strict';

var Logger = require('./logger.js');
var HomePage = require('../pages/homePage.js');
var LoginMSOnlinePage = require('../pages/loginMSOnlinePage.js');
var LoginLivePage = require('../pages/loginLivePage.js');
var Q = require('q');

var homePage = new HomePage(),
    loginMSOnlinePage = new LoginMSOnlinePage(),
    loginLivePage = new LoginLivePage(),
    logger = new Logger();

var Common = function() {
    var self = this;

    /*
     * load --
     *
     * Load MS support page, resize windows, delete cookies
     */
    this.load = function () {
        logger.log('loading ' + browser.baseUrl);
        return browser.driver.get(browser.baseUrl).then(function () {
            logger.log('setting windows size to 1386x1024');
            return browser.manage().window().setSize(1386, 1024);
        }).then(function () {
            logger.log('waiting for angular to be ready');
            return self.waitAngularToBeAvailable();
        }).then(function (found) {
            if (!found) {
                logger.log('angular did not load within 60s');
                return Q.reject();
            } else {
                logger.log('deleting all cookies');
                return browser.manage().deleteAllCookies();
            }
        });
    };

    /*
     * login --
     *
     * Login with provided credentials
     */
    this.login = function (userAccount, password) {
        userAccount = userAccount || browser.params.login.userAccount;
        password = password || browser.params.login.password;

        logger.log('userAccount = ' + userAccount + '; password = ' + password);

        logger.log('Click on sign in link');
        return homePage.getAccountNameLink().click().then(function () {
            logger.log('waiting page redirecting to login microsoft online page');
            return self.waitElementBySelenium(loginMSOnlinePage.getUserNameInputLocator());
        }).then(function () {
            logger.log('clearing user name');
            return browser.driver.findElement(loginMSOnlinePage.getUserNameInputLocator()).clear();
        }).then(function () {
            logger.log('inputting user name');
            return browser.driver.findElement(loginMSOnlinePage.getUserNameInputLocator()).sendKeys(userAccount);
        }).then(function () {
            logger.log('clicking into password');
            return browser.driver.findElement(loginMSOnlinePage.getPasswordInputLocator()).click();
        }).then(function () {
            logger.log('waiting page redirecting to login live page');
            return self.waitElementBySelenium(loginLivePage.getPasswordInputLocator());
        }).then(function () {
            logger.log('clearing password');
            return browser.driver.findElement(loginLivePage.getPasswordInputLocator()).clear();
        }).then(function () {
            logger.log('inputting password');
            return browser.driver.findElement(loginLivePage.getPasswordInputLocator()).sendKeys(password);
        }).then(function () {
            logger.log('clicking submit button');
            return browser.driver.findElement(loginLivePage.getSubmitButtonLocator()).click();
        }).then(function () {
            logger.log('waiting page to be ready');
            return self.waitPageToBeReady();
        }).then(function () {
            logger.log('waiting page back to home');
            return self.waitElementBySelenium(homePage.getAccountNameLinkLocator());
        });
    };

    /*
     * waitAngularToBeAvailable --
     *
     * Wait angular to be available
     */
    this.waitAngularToBeAvailable = function () {
        logger.log('waiting for up to 60s for angular to become available');
        return browser.executeAsyncScript(function (callback) {
            var count = 0;

            var angularAvailable = function () {
                return typeof window.angular !== 'undefined';
            };

            var check = function () {
                count++;

                if (angularAvailable()) {
                    callback(true);
                } else if (count < 60) {
                    setTimeout(check, 1000);
                } else {
                    callback(false);
                }
            };

            setTimeout(check, 1000);
        });
    };

    /*
     * waitPageToBeReady --
     *
     * Wait the page to be loaded completely
     */
    this.waitPageToBeReady = function () {
        logger.log('waiting for up to 60s for page to be ready');

        return browser.executeAsyncScript(function (callback) {
            var count = 0;
            var pageReady = function () {
                return document.readyState === 'complete';
            };
            var check = function () {
                count++;

                if (pageReady()) {
                    callback(true);
                } else if (count < 60) {
                    setTimeout(check, 1000);
                } else {
                    callback(false);
                }
            };
            setTimeout(check, 1000);
        });
    };

    /*
     * waitElementBySelenium --
     *
     * Wait element present using selenium method when protractor is probably not ready.
     */
    this.waitElementBySelenium = function (elementLocator, timeout) {
        timeout = typeof timeout !== 'undefined' ? timeout : 120000;

        return browser.driver.wait(function () {
            return browser.driver.isElementPresent(elementLocator);
        }, timeout);
    };

    /*
     * waitForElementVisibility --
     *
     * Wait for an element to become visible, return a promise.
     */
    this.waitForElementVisibility = function (e) {
        var EC = protractor.ExpectedConditions;
        return browser.driver.wait(EC.visibilityOf(e), 60000);
    };

};
module.exports = Common;