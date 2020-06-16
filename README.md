# port-numbers
[![](https://img.shields.io/npm/v/port-numbers.svg?style=flat)](https://www.npmjs.org/package/port-numbers) [![](https://img.shields.io/npm/dm/port-numbers.svg)](https://www.npmjs.org/package/port-numbers)
> Get information on network port numbers and services, based on [IANA's public listing](http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml).

### Usage
```
npm i port-numbers
```
```js
const {getService, getPort} = require('port-numbers');

getService(6379);
// { name: 'redis', description: 'An advanced key-value cache and store' }
getService(26257);
// { name: 'cockroach', description: 'CockroachDB' }
getService(123, 'udp');
// { name: 'ntp', description: 'Network Time Protocol' }

getPort('redis');
// { port: 6379, protocol: 'tcp', description: 'An advanced key-value cache and store' }
getPort('cockroach');
// { port: 26257, protocol: 'tcp', description: 'CockroachDB' }
getPort('ntp', 'udp');
// { port: 123, protocol: 'udp', description: 'Network Time Protocol' }
```

### API
#### getService(port[, protocol])
- `port` *Number* : the port to lookup. Required.
- `protocol` *String* : the protocol. Default: `tcp`.

#### getPort(service[, protocol])
- `service` *String* : the service to lookup. Required.
- `protocol` *String* : the protocol. Default: `tcp`.

© [silverwind](https://github.com/silverwind), distributed under BSD licence
