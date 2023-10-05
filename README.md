# port-numbers
[![](https://img.shields.io/npm/v/port-numbers.svg?style=flat)](https://www.npmjs.org/package/port-numbers) [![](https://img.shields.io/npm/dm/port-numbers.svg)](https://www.npmjs.org/package/port-numbers) [![](https://packagephobia.com/badge?p=port-numbers)](https://packagephobia.com/result?p=port-numbers)

npm module that holds information on network port numbers based on [IANA's data](http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml).

### Usage
```js
import ports from "port-numbers" assert { type: "json" };;

ports["6379/tcp"];
// ["redis", "An advanced key-value cache and store"]
ports["123/udp"];
// ["ntp", "Network Time Protocol"]
```

### API

The export is a JSON object in with `port/proto` as key and `[name, description]` as value.

```json
{
  "6379/tcp": [
    "redis",
    "An advanced key-value cache and store"
  ]
}
```

© [silverwind](https://github.com/silverwind), distributed under BSD licence
