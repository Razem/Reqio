'use strict';

/** @module reqio */

// Helpers
var
isObject = function (obj) { return typeof obj === "object" && obj !== null; },
has = Object.prototype.hasOwnProperty;

// Promise
var Promise;
var createPromise = function (executor) {
  return new (Promise || global.Promise)(executor);
};

/**
 * @param {Function} Constructor
 */
exports.setPromise = function (Con) {
  Promise = Con;
};

// Query string
var stringifyQs = function (obj) {
  var arr = [];
  for (var i in obj) if (has.call(obj, i)) {
    arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
  }
  return arr.join("&");
};
var createQs = function (obj) {
  return stringifyQs(obj);
};
var createUrl = function (url, get) {
  if (get) url += "?" + (isObject(get) ? createQs(get) : get);
  return url;
};

/**
 * @param {Function} fn Formatting function
 */
exports.setQs = function (fn) {
  stringifyQs = fn;
};

// Request
require("./lib/file")(exports, createPromise, createUrl, createQs, isObject);
require("./lib/script")(exports, createPromise, createUrl);
