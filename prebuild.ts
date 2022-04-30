import { config } from "dotenv";
config();

import { redisClient } from "./src/redisClient";
import { RedisCache } from "./src/Cache/RedisCache";
import { setEnvValue } from "./src/EnvHelper";

const prebuild = async () => {
    console.log("Prebuild: Started");
    const cache = new RedisCache(redisClient);
    const pong = await cache.ping();
    // Toggle prebuild to true and post build to false in order to indicate that we are in building mode.
    setEnvValue("PREBUILD", "true");
    setEnvValue("POSTBUILD", "false");
    console.log(pong); 
    await redisClient.disconnect();
    console.log("Prebuild: Done");
}

prebuild();