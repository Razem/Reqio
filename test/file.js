'use strict';
var
expect = require("expect.js"),
Reqio = require("../index"),
urls = require("./urls");

describe("File", function () {
  this.timeout(0);

  describe(".load()", function () {
    it("loads the content of a web page in a form of plain text", function (done) {
      Reqio.load(urls.text)
        .then(function (val) {
          expect(val).to.be("test");

          done();
        });
    });

    it("also provides GET and POST functionality", function (done) {
      Reqio.load(urls.gp, { post: { a: 1, b: 2 }, get: { a: 3, b: 4 } })
        .then(function (val) {
          expect(val).to.be("GET:a3b4|POST:a1b2");

          done();
        });
    });

    it("rejects the promise if the HTTP status isn't 200", function (done) {
      Reqio.load(urls.error)
        .catch(function (err) {
          expect(err.status).not.to.be(200);

          done();
        });
    });
  });

  describe(".loadJSON()", function () {
    it("loads JSON data", function (done) {
      Reqio.loadJSON(urls.json)
        .then(function (data) {
          expect(data).to.eql({ test: 42 });

          done();
        });
    });
  });
});
