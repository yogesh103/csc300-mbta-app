const redis = require('redis');

class RedisService {
  constructor(options = {}) {
    this.host = options.host || 'localhost';
    this.port = options.port || 6379;
    this.db = options.db || 0;
    this.password = options.password || undefined;
    this.client = redis.createClient({
        host: this.host,
        port: this.port,
        db: this.db,
        password: this.password,
      });
  }

  async connect() {
    if (!this.client) {
      this.client = redis.createClient({
        host: this.host,
        port: this.port,
        db: this.db,
        password: this.password,
      });
      this.client.connect();
        this.client.on('ready', () => {
          console.log(`Connected to Redis at ${this.host}:${this.port}`);
        });
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.disconnect();
      this.client = null;
      console.log(`Disconnected from Redis at ${this.host}:${this.port}`);
    }
  }

  async get(key) {
    await this.connect();
    const valueRT = await this.client.get(key);
    return valueRT;
  }

  async set(key, value) {
    await this.connect();
    const valueRT = await this.client.set(key, value);
    return valueRT;
  }
}

module.exports = RedisService;
