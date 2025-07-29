const Redis = require("ioredis");
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  retryStrategy(times) {
    return Math.min(times * 50, 2000); // reconnect delay
  },
});

redis.on("connect", () => {
  console.log("Redis connected successfully");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
  redis.end(); // Disconnect on error to prevent further issues
});

module.exports = redis;
