import {readFileSync} from "node:fs";

test("ports", () => {
  // json import in vitest is horribly slow, this is about 50 times faster
  const ports = JSON.parse(readFileSync(new URL("index.json", import.meta.url), "utf8"));
  expect(ports["0/tcp"]).toEqual(["", "Reserved"]);
  expect(ports["3306/tcp"]).toEqual(["mysql", "MySQL"]);
  expect(ports["53/udp"]).toEqual(["domain", "Domain Name Server"]);
  expect(ports["65536/udp"]).toBeUndefined();
  expect(ports["80/tcp"]).toEqual(["www-http", "World Wide Web HTTP"]);
});
