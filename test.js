"use strict";

const assert = require("assert");
const getService = require(".").getService;
const getPort = require(".").getPort;

assert(getService(80).name === "http");
assert(getService(80, "tcp").name === "http");
assert(getService(53, "udp").name === "domain");
assert(getService(3306).name === "mysql");
assert(getService(12345).name === "italk");

assert(getPort("http").port === 80);
assert(getPort("ntp").port === 123);
assert(getPort("https").port === 443);
assert(getPort("mysql").port === 3306);
assert(getPort("italk").port === 12345);

assert(getService(9).description === "Discard");
assert(getService(70).description === "Gopher");
assert(getService(68).description === "Bootstrap Protocol Client");
assert(getPort("tftp").description === "Trivial File Transfer");
assert(getPort("ssh").description === "The Secure Shell (SSH) Protocol");
assert(getPort("snmp").description === "SNMP");

assert(getService(65536) === null);
assert(getPort("doesnotexist") === null);
