/**
 * Created by sha on 1/10/2017.
 */
exports.config = {
    seleniumServerJar: '../node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': process.env.BROWSER
    },

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine',
    allScriptsTimeout: 300000,

    // Spec patterns are relative to the current working directory when
    // protractor is called.
    specs: [
        'specs/login.js',
        'specs/search.js'
    ],

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 300000,
        isVerbose: true
    },

    onPrepare: function () {
        browser.getCapabilities().then(function (cap) {
            browser.browserName = cap.get('browserName');
        });

    },

    baseUrl: 'http://support.microsoft.com/en-us',
    params: {
        login: {
            userName: 'Test HYD',
            userAccount: 'HYD_Test@outlook.com',
            password: 'Password!QAZ'
        }
    },
};