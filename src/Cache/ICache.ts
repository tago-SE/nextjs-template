export interface ICache {

    /**
     * Returns cached value or null. 
     */
    get(key: string): Promise<any | null>

    /**
     * Update the cached value. Returns true if successful.
     * @param key 
     * @param value 
     * @param options { ttl }
     */
    set(key: string, value: any, options?: SetOptions): Promise<boolean>

    /**
     * Delete cached value. 
     * Returns 1 if the cached value was deleted, 0 if there was no cached value to delete.
     */
    del(key: string): Promise<number>
    
    /**
     * Returns the expiration time in seconds. TTL <= 0 should be considered as expired.
     * -1, if the key does not have expiry timeout. -2, if the key does not exist.
     */
    ttl(key: string): Promise<number>;

    /**
     * Returns true if the cached value exists.
     */
    has(key: string): Promise<boolean>;

    /**
     * Health check the cache server. 
     * Returns "PONG" if the remote cache is reachable.
     */
    ping(): Promise<string | null>;

    /**
     * Returns all cached keys.
     */
    keys(): Promise<string[]>;

    /**
     * Purges the entire cache.
     */
    flushAll(): Promise<string>;
}

export interface SetOptions {
    ttl?: number
}

export interface CacheConfig {
    ttl?: number;
}