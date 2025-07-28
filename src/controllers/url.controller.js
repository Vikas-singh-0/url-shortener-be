const redis = require("../configs/redis");
const urlService = require("./../services/url.service");

exports.createShortUrl = async (req, res) => {
  // Validate request body
  const { originalUrl, expiresAt } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  try {
    const shortUrl = await urlService.createShorturl(originalUrl, expiresAt, req.user?.id);
    return res.status(201).json({ shortUrl });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.redirectUrl = async (req, res) => {
  const shortCode = req.params.shortCode;
  const startTime = Date.now();
  try {
    // try redis first
    const cachedUrl = await redis.get(shortCode);
    console.log('🔵 Cache Check:', cachedUrl);
    
    if (cachedUrl) {
      console.log("Cache hit");
      return res.redirect(cachedUrl);
    }
    console.log("Cache miss, fetching from DB");
    // if not found in redis, fetch from DB
    const originalUrl = await urlService.getOriginalUrl(shortCode);
    if (!originalUrl) {
      return res.status(404).json({ error: "URL not found or expired" });
    }

    // cache the original URL in Redis
    const cacheDuration = 60 * 60; // 1 hour
    const ttlSeconds = originalUrl.expiresAt
      ? Math.floor((originalUrl?.expiresAt - Date.now()) / 1000)
      : cacheDuration;
    console.log(`Caching URL for ${ttlSeconds} seconds`, originalUrl);

    await redis.setex(shortCode, ttlSeconds, originalUrl);
    console.log(`🔵 Cache MISS: ${Date.now() - startTime}ms`);

    return res.redirect(originalUrl);
  } catch (error) {
    console.error("Error redirecting to original URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
