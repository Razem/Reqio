'use strict';

module.exports = function (exports, createPromise, createUrl) {
  // A script loading for a browser environment
  var window = global.window;
  if (window && window.document) {
    var
    document = window.document,
    head = document.getElementsByTagName("head")[0],

    /**
     * @alias module:reqio.loadScript
     * @param {String} url
     * @param {String|Object} [get]
     * @returns {Promise}
     */
    loadScript = function (url, get) {
      url = createUrl(url, get);

      return createPromise(function (resolve, reject) {
        var
        script = document.createElement("script"),
        done = function () {
          head.removeChild(this);
          resolve(this);
        };

        if (script.readyState) {
          script.onreadystatechange = function () {
            var state = this.readyState;
            if (state === "complete" || state === "loaded") {
              this.onreadystatechange = null;
              done.call(this);
            }
          };
        }
        else {
          script.onload = done;
        }

        script.src = url;
        head.appendChild(script);
      });
    },

    jsonpCount = 0,

    /**
     * @alias module:reqio.loadJSONP
     * @param {String} url
     * @param {String|Object} [get]
     * @returns {Promise}
     * @example
     *  Reqio.loadJSONP("http://example.com/?cb=?");
     *  Reqio.loadJSONP("http://example.com/?cb=%3F");
     *  Reqio.loadJSONP("http://example.com/", { cb: "?" });
     *  Reqio.loadJSONP("http://example.com/"); // automatically adds `?callback=?`
     */
    loadJSONP = function (url, get) {
      url = createUrl(url, get);

      var callbackId = "__REQIO_JSONP_" + (++jsonpCount);

      return createPromise(function (resolve, reject) {
        global[callbackId] = function (data) {
          try {
            delete global[callbackId];
          }
          catch (err) {
            global[callbackId] = undefined;
          }

          resolve(data);
        };

        var fileWithCb = url.replace(/(=)(\?|%3F)($|&)/, "$1" + callbackId + "$3");
        if (fileWithCb === url) {
          fileWithCb = url + (url.indexOf("?") !== -1 ? "&" : "?") + "callback=" + callbackId;
        }

        loadScript(fileWithCb);
      });
    };

    exports.loadScript = loadScript;
    exports.loadJSONP = loadJSONP;
  }
};
