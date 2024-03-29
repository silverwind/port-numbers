#!/usr/bin/env node
import {csvParse} from "d3-dsv";
import {writeFileSync} from "node:fs";

function cleanupDescription(str) {
  return (str || "")
    .replace(/\nIANA assigned this.*/g, "")  // remove historical descriptions
    .replace(/\s+/g, " ") // force description to be single-line
    .trim();
}

function exit(err) {
  if (err) console.error(err);
  process.exit(err ? 1 : 0);
}

async function main() {
  const res = await fetch("https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.csv");
  const text = await res.text();

  const output = {};
  for (const {
    "Service Name": name,
    "Port Number": port,
    "Transport Protocol": proto,
    "Description": descr,
  } of csvParse(text)) {
    if (port && proto && !Number.isNaN(Number(port))) {
      output[`${port}/${proto}`] = [name, cleanupDescription(descr)];
    }
  }
  writeFileSync(new URL("index.json", import.meta.url), JSON.stringify(output, null, 1));
}

main().then(exit).catch(exit);
