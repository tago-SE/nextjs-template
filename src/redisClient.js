"use strict";

exports.__esModule = true;
exports.redisClient = void 0;
exports.createClient = void 0;

const redis = require("redis");

const createClient = (name, url, password) => {
    const client = (0, redis.createClient)({
        name: name,
        url: url ,
        password: password
    });

    client.connect();

    client.on('connect', function () {
        console.log("".concat(name, ": connecting..."));
    });

    client.on('ready', function () {
        console.log("".concat(name, ": ready!"));
    });

    client.on('reconnecting', function () {
        console.log("".concat(name, ": reconnecting..."));
    });

    client.on('error', console.error);

    client.on('end', function () {
        console.log("".concat(name, ": end"));
    });

    process.on('SIGINT', function () {
        client.quit();
    });

    return client;
}

if (!process.env.REDIS_CONNECTION_STRING)
    throw new Error("REDIS_CONNECTION_STRING missing");
if (!process.env.REDIS_PASSWORD)
    throw new Error("REDIS_PASSWORD missing");
const name = "default";
const url = "rediss://" + process.env.REDIS_CONNECTION_STRING;
const password = process.env.REDIS_PASSWORD;
const defaultRedisClient = createClient(name, url, password);

exports.redisClient = defaultRedisClient;
exports.createClient = createClient;