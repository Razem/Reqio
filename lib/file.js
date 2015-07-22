'use strict';
var
request = require("./request");

module.exports = function (exports, createPromise, createUrl, createQs, isObject) {
  var performRequest = function (url, options, fn) {
    if (options === undefined) options = {};

    url = createUrl(url, options.get);

    var post = options.post;
    if (isObject(post)) post = createQs(post);

    return createPromise(function (resolve, reject) {
      request(
        url,
        function (err, res) {
          if (err) reject(err);
          else {
            if (fn) {
              try {
                res = fn(res);
              }
              catch (ex) {
                reject(ex);
              }
            }

            resolve(res);
          }
        },
        post, options.headers
      );
    });
  };

  /**
   * @alias module:reqio.load
   * @param {String} url
   * @param {Object} options get: Object, post: Object, headers: Object
   * @returns {Promise}
   */
  exports.load = function (url, options) {
    return performRequest(url, options);
  };

  /**
   * @alias module:reqio.loadJSON
   * @param {String} url
   * @param {Object} options get: Object, post: Object, headers: Object
   * @returns {Promise}
   */
  exports.loadJSON = function (url, options) {
    return performRequest(url, options, JSON.parse);
  };
};
