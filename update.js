#!/usr/bin/env node
"use strict";

const source = "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.csv";
const got = require("got");
const csvParse = require("csv-parse");
const fs = require("fs");

got(source).catch(console.error).then(res => {
  csvParse(res.body, {}, (err, data) => {
    if (err) return exit(err);
    parsePorts(data, err => {
      if (err) return exit(err);
      parseServices(data, err => {
        if (err) return exit(err);
        process.exit(0);
      });
    });
  });
});

function exit(err) {
  console.error(err);
  process.exit(1);
}

function parsePorts(data, cb) {
  const output = {};
  data.forEach(entry => {
    if (entry[1] && entry[2] && !output[`${entry[1]}/${entry[2]}`] && !Number.isNaN(Number(entry[1]))) {
      output[`${entry[1]}/${entry[2]}`] = {
        name: entry[0],
        description: cleanupDescription(entry[3]),
      };
    }
  });
  fs.writeFile("./ports.json", JSON.stringify(output, null, 2), cb);
}

function parseServices(data, cb) {
  const output = {};
  data.forEach(entry => {
    if (!output[entry[0]] && entry[1] && entry[2] && typeof entry[0] === "string" &&
      entry[0].length && !Number.isNaN(Number(entry[1]))) {
      output[entry[0]] = {
        ports: [`${Number(entry[1])}/${entry[2]}`],
        description: cleanupDescription(entry[3]),
      };
    } else if (output[entry[0]] && entry[1] && entry[2] && typeof entry[0] === "string" &&
           entry[0].length && !Number.isNaN(Number(entry[1])) &&
           !output[entry[0]].ports.includes(`${Number(entry[1])}/${entry[2]}`)) {
      output[entry[0]].ports.push(`${entry[1]}/${entry[2]}`);
    }
  });
  fs.writeFile("./services.json", JSON.stringify(output, null, 2), cb);
}

function cleanupDescription(str) {
  if (!str) return undefined;

  // remove historical descriptions
  str = str.replace(/\nIANA assigned this.*/gm, "");

  // force description to be single-line
  str = str.replace(/[\s\n]+/g, " ");

  return (str || "").trim();
}
