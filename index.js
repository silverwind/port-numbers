"use strict";

var db = require("./db.json");

module.exports = function pn(port, protocol) {
    if (typeof port !== "number") {
        throw new Error("port is required an must be of type 'number'");
    }

    if (!protocol) {
        protocol = "tcp";
    }

    return db[port + "/" + protocol];
};