#!/usr/bin/env node
import {writeFileSync} from "node:fs";
import {exit as exitProcess} from "node:process";
import {csvParse} from "d3-dsv";

/** Clean up a CSV description string into a normalized single-line value. */
function cleanupDescription(str: string | undefined): string {
  return (str ?? "")
    .replace(/\nIANA assigned this.*/g, "")  // remove historical descriptions
    .replace(/\s+/g, " ") // force description to be single-line
    .trim();
}

try {
  const res = await fetch("https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.csv");
  const text = await res.text();

  const output: Record<string, Array<string>> = {};
  for (const {
    "Service Name": name,
    "Port Number": port,
    "Transport Protocol": proto,
    "Description": descr,
  } of csvParse(text)) {
    if (port && proto && !Number.isNaN(Number(port))) {
      output[`${port}/${proto}`] = [name ?? "", cleanupDescription(descr)];
    }
  }
  writeFileSync(new URL("index.json", import.meta.url), JSON.stringify(output, null, 1));
} catch (err) {
  console.error(err);
  exitProcess(1);
}
