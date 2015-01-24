#port-numbers [![NPM version](https://img.shields.io/npm/v/port-numbers.svg?style=flat)](https://www.npmjs.org/package/port-numbers) [![Dependency Status](http://img.shields.io/david/silverwind/port-numbers.svg?style=flat)](https://david-dm.org/silverwind/port-numbers)
> Get the information on network port numbers, based on IANA's public listing

###Installation
```
$ npm install --save port-numbers
```
###Example
```js
var pn = require("port-numbers");
pn(80, function(err, result) {
    console.log(result);
    // => { name: 'http', description: 'World Wide Web HTTP' }
});
pn(53, "udp", function(err, result) {
    console.log(result);
    // => { name: 'domain', description: 'Domain Name Server' }
});
```
### API
#### pn(port, [protocol], [callback])
- `port` *number* : the port to lookup. Required.
- `protocol` *string* : the protocol. Default: `tcp`.
- `callback` *function* : the callback receives `err` and an object containing `name` and `description`.

© 2015 [silverwind](https://github.com/silverwind), distributed under BSD licence
