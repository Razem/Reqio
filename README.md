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

## Installation:
```
npm install reqio
```

## Compatible with:
- Node.js
- Browserify
