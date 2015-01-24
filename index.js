"use strict";

var pn, db,
    path   = require("path"),
    fs     = require("fs"),
    dbFile = path.join(__dirname + "/db.json"),
    source = "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.csv";

pn = function pn(port, protocol, cb) {
    if (typeof protocol === "function") {
        cb = protocol;
        protocol = "tcp";
    }
    lookup(port, protocol, cb);
};

function lookup(port, protocol, cb) {
    if (db && db.length) {
        cb(null, db[port + "/" + protocol]);
    } else {
        fs.readFile(dbFile, function (err, data) {
            db = JSON.parse(data);
            cb(err, db[port + "/" + protocol]);
        });
    }
}

pn.update = function update(cb) {
    var output = {},
        got    = require("got"),
        parse  = require("csv-parse");

    got(source, function (err, csv) {
        if (err) return cb(err);
        parse(csv, null, function (err, data) {
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
            fs.writeFile(dbFile, JSON.stringify(output, null, 2), function () {
                if (cb) cb();
            });
        });
    });
};

module.exports = pn;