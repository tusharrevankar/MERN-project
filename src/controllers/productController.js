const Product = require('../models/product');
const redisClient = require('../config/redis');

const productController = {
    async getRecentlyViewed(req, res) {
        try {
            const userId = req.user.id;
            const key = `user:${userId}:recentlyViewed`;

            // Get recently viewed products with scores (timestamps)
            const recentlyViewed = await redisClient.zRangeWithScores(key, 0, -1);

            // Format the response
            const products = await Promise.all(
                recentlyViewed.map(async (item) => {
                    const product = await Product.findByPk(item.value);
                    return {
                        productId: item.value,
                        timestamp: item.score,
                        productDetails: product
                    };
                })
            );

            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll({
                attributes: ['id', 'name', 'description', 'price']
            });
            res.json(products);
        } catch (error) {
            logger.error('Error fetching products:', error);
            res.status(500).json({ message: error.message });
        }
    },

    async viewProduct(req, res) {
        try {
            const productId = req.params.productId;
            const product = await Product.findByPk(productId);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = productController; 