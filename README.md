# port-numbers [![NPM version](https://img.shields.io/npm/v/port-numbers.svg?style=flat)](https://www.npmjs.org/package/port-numbers) [![Dependency Status](http://img.shields.io/david/silverwind/port-numbers.svg?style=flat)](https://david-dm.org/silverwind/port-numbers)
> Get the information on network port numbers, based on [IANA's public listing](http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)

### Installation
```
$ npm install --save port-numbers
```
### Example
```js
var pn = require("port-numbers");

// port -> service
pn.getService(80);
//=> { name: 'http', description: 'World Wide Web HTTP' }
pn.getService(3306);
//=> { name: 'mysql', description: 'MySQL' }

// service -> port
pn.getPort("ntp", "udp");
//=> { port: '123', protocol: 'udp', description: 'Network Time Protocol' }
pn.getPort("postgresql");
//=> { port: '5432', protocol: 'tcp', description: 'PostgreSQL Database' }
```

### API
#### .getService(port, [protocol])
- `port` *number* : the port to lookup. Required.
- `protocol` *string* : the protocol. Default: `tcp`.

#### .getPort(service, [protocol])
- `service` *string* : the service to lookup. Required.
- `protocol` *string* : the protocol. Default: `tcp`.

© 2015 [silverwind](https://github.com/silverwind), distributed under BSD licence
