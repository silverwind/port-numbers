import ports from "./index.json";

test("ports", () => {
  expect(ports["0/tcp"]).toMatchSnapshot();
  expect(ports["3306/tcp"]).toMatchSnapshot();
  expect(ports["53/udp"]).toMatchSnapshot();
  expect(ports["65536/udp"]).toMatchSnapshot();
  expect(ports["80/tcp"]).toMatchSnapshot();
});
