# Gates.js

[![Build Status](https://travis-ci.org/piotrkabacinski/gatesjs.svg?branch=master)](https://travis-ci.org/piotrkabacinski/gatesjs)

Set specific callbacks for specific responses.

## Usage

Install gates.js module:

```bash
$ npm install gatesjs --save
```

Include module in your project:

```JavaScript
const gates = require("gatesjs");
```

Set up your gates in main request callback. Using `set` method pass response's code value:

```JavaScript
new gates().set(response.statusCode);
```

Each gate function needs two parameters: `array` with condition rules and `callback` function. The first array's element is an expected status code (required, in example below `200`), the second one is an optional expression (e.g. `foo === true`):

```JavaScript
request("http://example.com/foo.json", (error, response, body) => {

  body = JSON.parse(body); // => { foo: true }

  new gates().set(response.code)

       .gate([200 , body.foo === true], () => { console.log('Hello 200 status callback and true foo!'); });

});
```
If there's a possibility the condition could not be met, set default callback using `default` method:

```JavaScript
 .default(() => { console.log('Hello default callback!'); });
```

For any kind of response codes or any expression use asterisk `*` argument:

```JavaScript
 .gate([ "*", data.foo === false ], () => { console.log('Hello callback for whatever status and falsy foo!'); })
 .gate([ 404, "*" ], () => { console.log('Hello callback for 404 status and whatever!'); });
```

When you clone the repository check for more examples by launching `$ node index.js` after `$ npm install`.

## License

MIT.
