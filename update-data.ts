#!/usr/bin/env node
import {writeFileSync} from "node:fs";
import {csvParse} from "d3-dsv";

function cleanupDescription(str: string | undefined): string {
  return (str ?? "")
    .replace(/\nIANA assigned this.*/g, "") // remove historical descriptions
    .replace(/\s+/g, " ")
    .trim();
}

const res = await fetch("https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.csv");
if (!res.ok) throw new Error(`Fetching IANA data failed with HTTP ${res.status}`);

const output: Record<string, Array<string>> = {};
for (const {
  "Service Name": name,
  "Port Number": port,
  "Transport Protocol": proto,
  "Description": descr,
} of csvParse(await res.text())) {
  if (port && proto && !Number.isNaN(Number(port))) {
    output[`${port}/${proto}`] = [name ?? "", cleanupDescription(descr)];
  }
}
writeFileSync(new URL("index.json", import.meta.url), JSON.stringify(output, null, 1));
