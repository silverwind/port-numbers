import {readFileSync} from "node:fs";

let ports, services;

// port -> service
export function getService(port, protocol = "tcp") {
  if (typeof port !== "number") throw new Error("expected a 'number'");
  if (!ports) ports = JSON.parse(readFileSync(new URL("ports.json", import.meta.url)));
  return ports[`${port}/${protocol}`] || null;
}

// service -> port
export function getPort(service, protocol = "tcp") {
  if (typeof service !== "string") throw new Error("expected a 'string'");
  if (!services) services = JSON.parse(readFileSync(new URL("services.json", import.meta.url)));

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
}
