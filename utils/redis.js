import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => {
      console.log(`Redis client not connected to server: ${err}`);
    });
  }

isAlive() {
  return this.client.connected;
}

async get(key) {
  const redisGet = promisify(this.client.get).bind(this.client);
  const value = await redisGet(key);
  return value;
}

// the key value pair to redis server
async set(key, value, time) {
  const redisSet = promisify(this.client.set).bind(this.client);
  await redisSet(key, value);
  await this.client.expire(key, time);
}

// del key vale pair from redis server
async del(key) {
  const redisDel = promisify(this.client.del).bind(this.client);
  await redisDel(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
