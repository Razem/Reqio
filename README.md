# Reqio

A simple async requests library using promises.
It doesn't require any promise library as long as there is a global Promise object.
You can however specify your own ES6-compatible promise:
```
Reqio.setPromise(MyPromise);
```

You can also specify a query-string stringifying function (used for GET & POST data):
```
Reqio.setQs(myQsStringify);
```

## Documentation:
```
Reqio
  .load(url, options?) -> Promise
  .loadJSON(url, options?) -> Promise
  .loadScript(url, get?: String | Object) -> Promise
    * Available only in the browser
  .loadJSONP(url, get?: String | Object) -> Promise
    * Requires ? char somewhere in the query-string
    * Available only in the browser
  .setPromise(fn(fn(resolve, reject)) -> Promise)
  .setQs(fn(obj) -> String)

options: {
  get?: String | Object
  post?: String | Object
  headers?: Object
}
```

## Installation:
```
npm install reqio
```

## Compatible with:
- Node.js
- Browserify
