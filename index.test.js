import {readFileSync} from "node:fs";

test("ports", () => {
  // json import in vitest is horribly slow, this is about 50 times faster
  const ports = JSON.parse(readFileSync(new URL("index.json", import.meta.url)));
  expect(ports["0/tcp"]).toMatchSnapshot();
  expect(ports["3306/tcp"]).toMatchSnapshot();
  expect(ports["53/udp"]).toMatchSnapshot();
  expect(ports["65536/udp"]).toMatchSnapshot();
  expect(ports["80/tcp"]).toMatchSnapshot();
});
