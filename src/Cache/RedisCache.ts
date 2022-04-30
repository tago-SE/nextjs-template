import { RedisClientType } from "redis";
import { CacheConfig, ICache, SetOptions } from "./ICache";

export class RedisCache implements ICache {

    private client: RedisClientType;
    private config: CacheConfig;

    private async ensureConnected () {
        if (this.client.isOpen) return;
        if (!this.client.isOpen) await this.client.connect();
    }

    constructor(redisClient: RedisClientType, config: CacheConfig = { ttl: undefined }) {
        this.client = redisClient;
        this.config = config;
    }

    async get(key: string) {
        try {
            await this.ensureConnected();
            return await this.client.get(key).then(str => str ? JSON.parse(str) : null);
        } catch (e: any) {
            const str = RedisCache.name + ".get(" + key + ") error: " + e.toString(); 
            console.info(str);
            return null;
        }
    }

    async set(key: string, value: any, options: SetOptions = {}) {
        try {
            await this.ensureConnected();
            return await this.client.set(key, JSON.stringify(value), { EX: options.ttl || this.config.ttl })
            .then(result => {
                if (result !== "OK") { 
                    const str = RedisCache.name + ".set(" + key + ") warn: " + result; 
                    console.warn(str); 
                }
                return result === "OK";
            });
        } catch (e: any) {
            const str = RedisCache.name + ".set(" + key + ") error: " + e.toString(); 
            console.info(str);
            return false;
        }
    }



    async del(key: string) {
        try {
            await this.ensureConnected();
            return await this.client.del(key);
        } catch (e: any) {
            console.info(`${RedisCache.name}.del(${key}): error: ${e.toString()}`);
            return 0;
        }
    }

    async ttl(key: string) {
        await this.ensureConnected();
        return await this.client.ttl(key);
    }

    async has(key: string) {
        try {
            await this.ensureConnected();
            return (await this.client.exists(key) === 1);
        } catch (e: any) {
            const str = RedisCache.name + ".has(" + key + "): error: " + e.toString();
            console.info(str);
            return false;
        }
    }

    async ping() {
        try {
            await this.ensureConnected();
            return await this.client.ping();
        } catch (e: any) {
            const str = RedisCache.name + "ping()  error: " + e.toString();
            console.info(str);
            return null;
        }
    }

    public async keys() {
        try {
            await this.ensureConnected();
            return await this.client.keys("*");
        } catch (e: any) {
            const str = RedisCache.name + ".keys() error: " + e.toString();
            console.info(str);
            return [];
        }
    }

    public async flushAll() {
        return this.client.flushAll();
    }

}

export const createRedisCache = (client: RedisClientType, config?: CacheConfig) => new RedisCache(client, config);

