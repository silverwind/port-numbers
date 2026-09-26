# port-numbers
[![](https://img.shields.io/npm/v/port-numbers.svg?style=flat)](https://www.npmjs.org/package/port-numbers) [![](https://img.shields.io/npm/dm/port-numbers.svg)](https://www.npmjs.org/package/port-numbers) [![](https://packagephobia.com/badge?p=port-numbers)](https://packagephobia.com/result?p=port-numbers)

npm module that holds information on network port numbers based on [IANA's data](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml).

## Usage

```sh
pnpm add port-numbers
```

Depending on your environment you may need to use [import attributes](https://github.com/tc39/proposal-import-attributes), [import assertions](https://nodejs.org/api/esm.html#import-assertions) or [nothing at all](https://bun.sh/guides/runtime/import-json).

```js
import ports from "port-numbers" with {type: "json"};

ports["6379/tcp"];
// ["redis", "An advanced key-value cache and store"]
ports["123/udp"];
// ["ntp", "Network Time Protocol"]
```

## API

The export is a JSON object with `port/proto` as key and `[name, description]` as value.

```json
{
  "6379/tcp": [
    "redis",
    "An advanced key-value cache and store"
  ]
}
```

© [silverwind](https://github.com/silverwind), distributed under BSD licence
