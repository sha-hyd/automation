/**
 * Created by sha on 1/12/2017.
 */
'use strict';

var LoginMSOnlinePage = function () {

    this.getUserNameInputLocator = function () {
        return by.css('input#cred_userid_inputtext');
    };

    this.getPasswordInputLocator = function () {
        return by.css('input#cred_password_inputtext');
    };

};
module.exports = LoginMSOnlinePage;