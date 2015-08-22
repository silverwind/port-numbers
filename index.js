"use strict";

var pn       = {};
var ports    = require("./ports.json");
var services = require("./services.json");

// port -> service
pn.getService = function getService(port, protocol) {
  if (typeof port !== "number") {
    throw new Error("expected a 'number'");
  }

  if (!protocol) {
    protocol = "tcp";
  }

  return ports[port + "/" + protocol] || null;
};

// service -> port
pn.getPort = function getPort(service, protocol) {
  var port, entry;
  if (typeof service !== "string") {
    throw new Error("expected a 'string'");
  }

  if (!protocol) {
    protocol = "tcp";
  }

  // services are always lowercase
  entry = services[service.toLowerCase()];
  if (entry) {
    // filter non-matching protocols
    port = entry.ports.filter(function (port) {
      return /\w+$/.exec(port)[0] === protocol;
    })[0];
    // return the first matching port
    if (port) {
      return {port: Number(/^\d+/.exec(port)[0]), protocol: /\w+$/.exec(port)[0], description: entry.description};
    }
  }
  return null;
};

module.exports = pn;
