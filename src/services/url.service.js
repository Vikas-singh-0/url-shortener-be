const urlModal = require('../modals/url.modal');
const base62 = require('../utils/base64');

const createShorturl = async (originalUrl, expiresAt = null, user = null, req) => {
  const existing = await urlModal.findOne({ originalUrl });
  if (existing) return `${process.env.BASE_URL}/${existing.shortCode}`;

  const newUrl = new urlModal({
    originalUrl,
    shortCode: base62.encode(Date.now()),
    expiresAt,
  });
  if (user) {
    newUrl.owner = user;
  }
  await newUrl.save();
  return `${req.get("host")}/${newUrl.shortCode}`;
}

const getOriginalUrl = async (shortCode) => {
  const url = await urlModal.findOne({ shortCode });
  // console.log(url);
  
  if (!url || (url.expiresAt && url.expiresAt < Date.now())) return null;
  return url.originalUrl;
}

const incrementClickCount = async (shortCode) => {
  const url = await urlModal.findOneAndUpdate(
    { shortCode },
    { $inc: { clickCount: 1 } },
    { new: true }
  );
  return url;
}

module.exports = {
  createShorturl,
  getOriginalUrl,
  incrementClickCount,
}