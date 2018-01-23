"use strict";

var pn = module.exports = {};
var ports, services;

// port -> service
pn.getService = function getService(port, protocol) {
  if (typeof port !== "number") {
    throw new Error("expected a 'number'");
  }

  if (!protocol) {
    protocol = "tcp";
  }

  if (!ports) {
    ports = require("./ports.json");
  }

  return ports[port + "/" + protocol] || null;
};

// service -> port
pn.getPort = function getPort(service, protocol) {
  if (typeof service !== "string") {
    throw new Error("expected a 'string'");
  }

  if (!protocol) {
    protocol = "tcp";
  }

  if (!services) {
    services = require("./services.json");
  }

  // services are always lowercase
  const entry = services[service.toLowerCase()];
  if (!entry) {
    return null;
  }

  // filter non-matching protocols
  const port = entry.ports.filter(function(port) {
    return /\w+$/.exec(port)[0] === protocol;
  })[0];

  if (!port) {
    return null;
  }

  // return the first matching port
  return {
    port: Number(/^\d+/.exec(port)[0]),
    protocol: /\w+$/.exec(port)[0],
    description: entry.description
  };
};
