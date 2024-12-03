const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const auth = require('../../middleware/auth');
const updateRecentlyViewed = require('../../middleware/recentlyViewed');

// Get all products (no auth required)
router.get('/', productController.getAllProducts);

// View single product (requires auth)
router.get('/:productId', auth, updateRecentlyViewed, productController.viewProduct);

// Get recently viewed products
router.get('/users/:userId/recentlyViewed', auth, productController.getRecentlyViewed);

module.exports = router; 