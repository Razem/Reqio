'use strict';
var
HTTP = require("http"),
HTTPS = require("https"),
URL = require("url");

function request(url, callback, postData, headers) {
  if (headers === undefined) headers = {};

  headers["Content-Type"] = "application/x-www-form-urlencoded";
  headers["Content-Length"] = postData ? postData.length : 0;

  var
  urlp = URL.parse(url),
  lib = urlp.protocol === "https:" ? HTTPS : HTTP;

  var req = lib.request({
    hostname: urlp.hostname,
    port: urlp.port,
    path: urlp.path,
    method: postData ? "POST" : "GET",
    headers: headers
  })
    .on("response", function (res) {
      var data = "";
      res.on("data", function (chunk) {
        data += chunk;
      });
      res.on("end", function () {
        if (+res.statusCode === 200) {
          callback(null, data);
        }
        else {
          callback(+res.statusCode);
        }
      });
    })
    .on("error", function (err) {
      callback(err);
    });

  if (postData) req.write(postData);
  req.end();
}

module.exports = request;
