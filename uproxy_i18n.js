(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.UproxyI18n = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var toLowerCase = String.prototype.toLowerCase.call.bind(String.prototype.toLowerCase);
var browserLanguages = navigator.languages ||
    [navigator.language || navigator.browserLanguage];
exports.makeLookUpLanguage = function (availableLanguages, normalize) {
    if (normalize === void 0) { normalize = toLowerCase; }
    return function (language) {
        language = normalize(language);
        for (var _i = 0, availableLanguages_1 = availableLanguages; _i < availableLanguages_1.length; _i++) {
            var availableLanguage = availableLanguages_1[_i];
            var availableLanguageId = availableLanguage.hasOwnProperty('id') ?
                availableLanguage.id : availableLanguage;
            var parts = normalize(availableLanguageId).split('-');
            while (parts.length) {
                var joined = parts.join('-');
                if (language === joined) {
                    return availableLanguageId;
                }
                parts.pop();
            }
        }
    };
};
exports.getBestMatchingLanguage = function (available, preferred) {
    if (preferred === void 0) { preferred = browserLanguages; }
    var lookUpAvailable = typeof available === 'function' ?
        available : exports.makeLookUpLanguage(available);
    for (var _i = 0, preferred_1 = preferred; _i < preferred_1.length; _i++) {
        var candidate = preferred_1[_i];
        var parts = candidate.split('-');
        while (parts.length) {
            var joined = parts.join('-');
            var closest = lookUpAvailable(joined);
            if (closest) {
                return closest;
            }
            parts.pop();
        }
    }
};

},{}]},{},[1])(1)
});