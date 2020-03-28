"use strict";

const getService = require(".").getService;
const getPort = require(".").getPort;
const {test, expect} = global;

test("getService", () => {
  expect(getService(12345).name).toEqual("italk");
  expect(getService(3306).name).toEqual("mysql");
  expect(getService(53, "udp").name).toEqual("domain");
  expect(getService(65536)).toEqual(null);
  expect(getService(68).description).toEqual("Bootstrap Protocol Client");
  expect(getService(70).description).toEqual("Gopher");
  expect(getService(80).name).toEqual("http");
  expect(getService(80, "tcp").name).toEqual("http");
  expect(getService(9).description).toEqual("Discard");
});

test("getPort", () => {
  expect(getPort("doesnotexist")).toEqual(null);
  expect(getPort("http").port).toEqual(80);
  expect(getPort("https").port).toEqual(443);
  expect(getPort("italk").port).toEqual(12345);
  expect(getPort("mysql").port).toEqual(3306);
  expect(getPort("ntp").port).toEqual(123);
  expect(getPort("snmp").description).toEqual("SNMP");
  expect(getPort("ssh").description).toEqual("The Secure Shell (SSH) Protocol");
  expect(getPort("tftp").description).toEqual("Trivial File Transfer");
});
