#!/usr/bin/env node
"use strict";

var source = "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.csv";
var got    = require("got");
var parse  = require("csv-parse");
var fs     = require("fs");

got(source).catch(console.error).then(function(res) {
  parse(res.body, null, function(err, data) {
    if (err) return exit(err);
    parsePorts(data, function(err) {
      if (err) return exit(err);
      parseServices(data, function(err) {
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

/* Fields:
 *
 * [ 'Service Name', 'Port Number', 'Transport Protocol', 'Description', 'Assignee', 'Contact', 'Registration Date', 'Modification Date',
 * 'Reference', 'Service Code', 'Known Unauthorized Uses', 'Assignment Notes' ]
 *
 * Examples:
 *
 * [ 'www', '80', 'udp', 'World Wide Web HTTP', '', '', '', '', '', '', '', 'This is a duplicate of the "http" service and should not be used for discovery purposes.' ]
 * [ 'ntp', '123', 'tcp', 'Network Time Protocol', '[Dave_Mills]', '[Dave_Mills]', '', '', '[RFC5905]', '', '', '' ]
 * [ 'http', '80', 'tcp', 'World Wide Web HTTP', '', '', '', '', '', '', '', 'Defined TXT keys: u=<username> p=<password> path=<path to document>' ]
 *
 */

function parsePorts(data, cb) {
  var output = {};
  data.forEach(function(entry) {
    if (entry[1] && entry[2] && !output[entry[1] + "/" + entry[2]] && !isNaN(Number(entry[1]))) {
      output[entry[1] + "/" + entry[2]] = {
        name: entry[0],
        description: cleanupDescription(entry[3]),
      };
    }
  });
  fs.writeFile("./ports.json", JSON.stringify(output, null, 2), cb);
}

function parseServices(data, cb) {
  var output = {};
  data.forEach(function(entry) {
    if (!output[entry[0]] && entry[1] && entry[2] && typeof entry[0] === "string" &&
      entry[0].length && !isNaN(Number(entry[1]))) {
      output[entry[0]] = {
        ports: [Number(entry[1]) + "/" + entry[2]],
        description: cleanupDescription(entry[3]),
      };
    } else if (output[entry[0]] && entry[1] && entry[2] && typeof entry[0] === "string" &&
           entry[0].length && !isNaN(Number(entry[1])) &&
           output[entry[0]].ports.indexOf(Number(entry[1]) + "/"  + entry[2]) === -1) {
      output[entry[0]].ports.push(entry[1] + "/"  + entry[2]);
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

  return str;
}
