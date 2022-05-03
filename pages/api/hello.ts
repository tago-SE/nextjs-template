// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createRedisCache } from "../../src/Cache/RedisCache";
import { defaultRedisClient as redisClient } from "../../src/defaultRedisClient";

const cache = createRedisCache(redisClient, { ttl: 20});

interface INextApiRequest<TSession> extends NextApiRequest {
  session: TSession;
}

export default async function handler(
  req: INextApiRequest<any>,
  res: NextApiResponse<any>
) {
  console.log("dun")
  try {
  let name: string;
  name = await cache.get("name");
  const pong = await cache.ping();
  const ttl = await cache.ttl("name");
  res.status(200).json({ name, pong, ttl });
  if (!name) {
    const set = await cache.set("name", "Tiago", { ttl: 5})
    console.log("SET", set)
  }
  const keys = await cache.keys();
  console.log(keys);
  } catch (e) {
    res.status(500).send("something went wrong")
  }
}
