#!/usr/bin/env node
"use strict";

var source = "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.csv";
var got    = require("got");
var parse  = require("csv-parse");
var fs     = require("fs");

got(source, function (err, csv) {
    if (err) return console.error(err);
    parse(csv, null, function (err, data) {
        var output = {};
        data.forEach(function (entry) {
            if (entry[1] && entry[2] &&
                !output[entry[1] + "/" + entry[2]] &&
                !isNaN(parseInt(entry[1], 10))) {
                output[entry[1] + "/" + entry[2]] = {
                    name: entry[0] || undefined,
                    description: entry[3] || undefined,
                };
            }
        });
        fs.writeFile("./db.json", JSON.stringify(output, null, 2), function () {
            console.info("db.json updated successfully!");
        });
    });
});
