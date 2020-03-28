"use strict";

let ports, services;

// port -> service
module.exports.getService = function getService(port, protocol = "tcp") {
  if (typeof port !== "number") throw new Error("expected a 'number'");
  if (!ports) ports = require("./ports.json");

  return ports[`${port}/${protocol}`] || null;
};

// service -> port
module.exports.getPort = function getPort(service, protocol = "tcp") {
  if (typeof service !== "string") throw new Error("expected a 'string'");
  if (!services) services = require("./services.json");

  // services are always lowercase
  const entry = services[service.toLowerCase()];
  if (!entry) return null;

  // filter non-matching protocols
  const port = entry.ports.filter(port => /\w+$/.exec(port)[0] === protocol)[0];
  if (!port) return null;

  // return the first matching port
  return {
    port: Number(/^\d+/.exec(port)[0]),
    protocol: /\w+$/.exec(port)[0],
    description: entry.description
  };
};
