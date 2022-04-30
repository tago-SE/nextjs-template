import type { NextApiRequest, NextApiResponse } from "next";
import { createRedisCache } from "../../../../src/Cache/RedisCache";
import { redisClient } from "../../../../src/redisClient";

const cache = createRedisCache(redisClient, { ttl: 5 * 60 });



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { key, ttl } = req.query as { key: string, ttl: string};
    if (!req.body) return res.status(400).send("Missing body.");
 
    const result = await cache.set(key.toString(), req.body);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send("Something went wrong")
  }
}
