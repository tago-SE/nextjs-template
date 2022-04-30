import type { NextApiRequest, NextApiResponse } from "next";
import { createRedisCache } from "../../../src/Cache/RedisCache";
import { redisClient } from "../../../src/redisClient";

const cache = createRedisCache(redisClient, { ttl: 5});


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const result = await cache.keys();
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send("Something went wrong")
  }
}
