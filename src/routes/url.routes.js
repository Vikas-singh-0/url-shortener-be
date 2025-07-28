const express = require('express');
const router = express.Router();
const urlController = require('../controllers/url.controller');
const userUrlController = require('../controllers/userUrl.controller');
const { protected, optional } = require('../middleware/auth.middleware');

// Route to create a short URL
router.post('/shorten', optional, urlController.createShortUrl);

// Route to redirect to the original URL
router.get('/:shortCode', urlController.redirectUrl);

router.get('/me/links', protected, userUrlController.getUserLinks);

router.delete('/links/:id', protected, userUrlController.deleteUserLink);

// Export the router
module.exports = router;