const Redis = require('ioredis');
const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
}, {
  maxRetriesPerRequest: null, // Disable automatic retries
  enableReadyCheck: false, // Enable ready check to ensure Redis is ready before using
  lazyConnect: false, // Connect lazily to avoid blocking the event loop
});

redis.on('connect', () => {
  console.log('Redis connected successfully');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
  redis.end(); // Disconnect on error to prevent further issues
});

module.exports = redis;