"use strict";

var pn = {},
    db = require("./db.json");

// port -> service
pn.getService = function getService(port, protocol) {
    if (typeof port !== "number") {
        throw new Error("expected a 'number'");
    }

    if (!protocol) {
        protocol = "tcp";
    }

    return db[port + "/" + protocol];
};

// service -> port
pn.getPort = function getPort(service, protocol) {
    var output;
    if (typeof service !== "string") {
        throw new Error("expected a 'string'");
    }

    if (!protocol) {
        protocol = "tcp";
    }

    Object.keys(db).some(function (entry) {
        if (db[entry].name === service && entry.match(/\w+$/)[0] === protocol) {
            output = {
                port: entry.match(/^\d+/)[0],
                protocol: protocol,
                description: db[entry].description
            };
            return true;
        }
    });
    return output;
};

module.exports = pn;