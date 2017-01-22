/**
 * Created by sha on 1/11/2017.
 */
'use strict';

var LoginLivePage = function () {

    this.getPasswordInputLocator = function () {
        return by.css('#Credentials input[name="passwd"]');
    };

    this.getSubmitButtonLocator = function () {
        return by.css('#idSIButton9');
    };
};
module.exports = LoginLivePage;