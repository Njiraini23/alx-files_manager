const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (err) => {
      console.error(`Redis error: ${err}`);
    });
  }

async isAlive() {
  return new Promise((resolve) => {
    resolve(this.client.connected);
  });
}

async get(key) {
  return new Promise((resolve, reject) => {
    this.client.get(key, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}
