"use strict";

let ports, services;

// port -> service
module.exports.getService = (port, protocol = "tcp") => {
  if (typeof port !== "number") throw new Error("expected a 'number'");
  if (!ports) ports = require("./ports.json");
  return ports[`${port}/${protocol}`] || null;
};

// service -> port
module.exports.getPort = (service, protocol = "tcp") => {
  if (typeof service !== "string") throw new Error("expected a 'string'");
  if (!services) services = require("./services.json");

  // services are always lowercase
  const entry = services[service.toLowerCase()];
  if (!entry) return null;

  // filter non-matching protocols
  const port = entry.ports.find(port => /\w+$/.exec(port)[0] === protocol);
  if (!port) return null;

  // return the first matching port
  return {
    port: Number(/^\d+/.exec(port)[0]),
    protocol: /\w+$/.exec(port)[0],
    description: entry.description
  };
};
