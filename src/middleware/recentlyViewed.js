const redisClient = require('../config/redis');

const updateRecentlyViewed = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
        const key = `user:${userId}:recentlyViewed`;

        // Add product to recently viewed list with timestamp
        await redisClient.zAdd(key, {
            score: Date.now(),
            value: productId
        });

        // Keep only the last 10 items
        await redisClient.zRemRangeByRank(key, 0, -11);

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = updateRecentlyViewed; 