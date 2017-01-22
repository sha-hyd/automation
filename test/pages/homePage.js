/**
 * Created by sha on 1/11/2017.
 */
'use strict';

var HomePgae = function () {
    var self = this;

    this.getAccountNameLinkLocator = function () {
        return by.css('.msame_Header_name');
    };

    this.getAccountNameLink = function () {
        return element(self.getAccountNameLinkLocator());
    };

    this.getAccountIcon = function () {
        return element(by.css('.msame_Header_picframe'));
    };

    this.getAccountNameFromDropDown = function () {
        return element(by.css('.msame_TxtTrunc.msame_Drop_active_name'))
    };

    this.getSearchInput = function () {
        return element(by.css('#search-text'))
    };

    this.getSearchButton = function () {
        return element(by.css('[ng-click="primarySearchClicked();"]'));
    };

    this.getSearchResultsPanel = function () {
        return element(by.css('.search-results-page'));
    };

    this.getSearchResults = function () {
        return element.all(by.css('#search-results-container .item-section'));
    };

};

module.exports = HomePgae;