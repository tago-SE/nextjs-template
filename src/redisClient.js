"use strict";

exports.__esModule = true;
exports.redisClient = void 0;
exports.createClient = void 0;

const redis = require("redis");

const createRedisClient = ({name, url, password}) => {
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

exports.createRedisClient = createRedisClient;