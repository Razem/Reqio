'use strict';
var
expect = require("expect.js"),
Reqio = require("../index"),
urls = require("./urls");

describe("Script", function () {
  this.timeout(0);

  describe(".loadScript()", function () {
    it("loads the script into a web page", function (done) {
      var value;
      global.processScript = function (data) {
        value = data;
      };

      Reqio.loadScript(urls.jsonp, { callback: "processScript" })
        .then(function (val) {
          expect(value).to.eql({ test: 42 });

          done();
        });
    });
  });

  describe(".loadJSONP()", function () {
    it("automatically creates a callback and loads the script", function (done) {
      Reqio.loadJSONP(urls.jsonp + "?callback=?")
        .then(function (val) {
          expect(val).to.eql({ test: 42 });

          done();
        });
    });

    it("also provides GET functionality", function (done) {
      Reqio.loadJSONP(urls.jsonp, { callback: "?" })
        .then(function (val) {
          expect(val).to.eql({ test: 42 });

          done();
        });
    });

    it("adds a default query parameter if none is given", function (done) {
      Reqio.loadJSONP(urls.jsonp)
        .then(function (val) {
          expect(val).to.eql({ test: 42 });

          done();
        });
    });
  });
});
