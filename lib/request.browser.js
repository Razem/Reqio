'use strict';

var
getXHR = function () {
  if (global.XMLHttpRequest) return new XMLHttpRequest();
  if (global.ActiveXObject) return new ActiveXObject("MSXML2.XMLHTTP");
},
has = Object.prototype.hasOwnProperty;

function request(url, callback, postData, headers) {
  if (headers === undefined) headers = {};

  headers["Content-Type"] = "application/x-www-form-urlencoded";
  headers["Content-Length"] = postData ? postData.length : 0;

  var xhr = getXHR();
  xhr.open(postData ? "POST" : "GET", url, true);

  for (var headerKey in headers) if (has.call(headers, headerKey)) {
    xhr.setRequestHeader(headerKey, headers[headerKey]);
  }

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (+this.status === 200) {
        callback(null, this.responseText);
      }
      else {
        callback(+this.status);
      }
    }
  };

  xhr.send(postData);
}

module.exports = request;
