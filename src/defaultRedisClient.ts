import {RedisClientType} from "redis";
import { createRedisClient } from "./redisClient";

const name = "default";
const url = "rediss://" + process.env.REDIS_CONNECTION_STRING;
const password = process.env.REDIS_PASSWORD;
export const defaultRedisClient = createRedisClient({name, url, password}) as RedisClientType;
