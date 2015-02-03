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

    // services are always lowercase
    service = service.toLowerCase();

    Object.keys(db).some(function (entry) {
        if (db[entry].name === service && entry.match(/\w+$/)[0] === protocol) {
            output = {
                port: parseInt(entry.match(/^\d+/)[0], 10),
                protocol: protocol,
                description: db[entry].description
            };
            return true;
        }
    });
    return output;
};

module.exports = pn;