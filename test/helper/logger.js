/**
 * Created by sha on 1/11/2017.
 */
'use strict';

var Q = require('q');
var Logger2 = require('../logger2');
var logger2 = new Logger2.Logger('test');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var Logger = function () {
    Number.prototype.pad = function (len) {
        return (new Array(len + 1).join("0") + this).slice(-len);
    };

    var lastLog = new Date();

    this.log = function (msg, level, pre) {
        var now = new Date(),
            diffSeconds = (now - lastLog) / 1000;

        if (typeof pre === 'undefined') {
            pre = '';
        }

        if (typeof msg === 'undefined') {
            msg = '';
        }

        if (typeof level === 'undefined') {
            level = 1;
        }

        var diffMillis = ('' + (diffSeconds % 1.00)).substring(2, 5);

        var time;

        if (diffSeconds === 0) {
            time = '(00.000s)';
        } else {
            var seconds = parseInt(diffSeconds);
            seconds = seconds < 9 ? seconds.pad(2) : seconds;
            time = '(' + seconds + '.' + diffMillis + 's)';
        }

        logger2.info(pre + time + (' '.repeat(level)) + ' ' + msg);
        lastLog = now;

        return now;
    };

    this.info = this.log;

    this.finish = function (loadBegin, testBegin) {
        var end = this.log('Test finished');
        this.log(
            ' Load time: ' + ((testBegin - loadBegin) / 1000) + 's');
        this.log(
            ' Test time: ' + ((end - testBegin) / 1000) + 's');
        this.log(
            ' Total time: ' + ((end - loadBegin) / 1000) + 's');
    };

    this.begin = function (message) {
        message = 'Beginning test: ' + message;
        this.log(message, 0);
        return this.log('-'.repeat(message.length), 0);
    };

    this.loading = function () {
        console.log('');
        console.log('');
        return this.log('Loading page', 0);
    };

    this.takeScreenShot = function (fileName) {
        browser.takeScreenshot().then(function (png) {
            // Create file path for screenshots
            var currentTime = new Date();
            var filePath = path.resolve('results/' + currentTime.getFullYear() + '_' + currentTime.getMonth()
                + '_' + currentTime.getDay() + '_' + currentTime.getHours() + '/' + browser.browserName);
            if (!fs.existsSync(filePath)) {
                mkdirp.sync(filePath);
            }

            // Save to file
            fs.writeFileSync(filePath + '/' + fileName + '.png', png, {encoding: 'base64'});
        });
    };
};
module.exports = Logger;
