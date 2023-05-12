#!/usr/bin/env node
import {fetch as undiciFetch} from "undici";
import fetchEnhanced from "fetch-enhanced";
import {csvParse} from "d3-dsv";
import {writeFile} from "node:fs/promises";

const fetch = fetchEnhanced(undiciFetch, {undici: true});
const source = "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.csv";
const portsFile = new URL("ports.json", import.meta.url);
const servicesFile = new URL("services.json", import.meta.url);

async function parsePorts(data) {
  const output = {};
  for (const {"Service Name": name, "Port Number": port, "Transport Protocol": proto, "Description": descr} of data) {
    if (
      port && proto &&
      !output[`${port}/${proto}`] &&
      !Number.isNaN(Number(port))
    ) {
      output[`${port}/${proto}`] = {
        name,
        description: cleanupDescription(descr),
      };
    }
  }
  await writeFile(portsFile, JSON.stringify(output, null, 2));
}

async function parseServices(data) {
  const output = {};
  for (const {"Service Name": name, "Port Number": port, "Transport Protocol": proto, "Description": descr} of data) {
    if (
      !output[name] && port && proto && typeof name === "string" &&
      name.length && !Number.isNaN(Number(port))
    ) {
      output[name] = {
        ports: [`${Number(port)}/${proto}`],
        description: cleanupDescription(descr),
      };
    } else if (
      output[name] && port && proto && typeof name === "string" &&
      name.length && !Number.isNaN(Number(port)) &&
      !output[name].ports.includes(`${Number(port)}/${proto}`)
    ) {
      output[name].ports.push(`${port}/${proto}`);
    }
  }
  await writeFile(servicesFile, JSON.stringify(output, null, 2));
}

function cleanupDescription(str) {
  if (!str) return undefined;

  // remove historical descriptions
  str = str.replace(/\nIANA assigned this.*/g, "");

  // force description to be single-line
  str = str.replace(/\s+/g, " ");

  return (str || "").trim();
}

function exit(err) {
  if (err) console.error(err);
  process.exit(err ? 1 : 0);
}

async function main() {
  const res = await fetch(source);
  const text = await res.text();
  const data = csvParse(text);
  await parsePorts(data);
  await parseServices(data);
}

main().then(exit).catch(exit);
