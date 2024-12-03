const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const productRoutes = require('./products');

// Add logging to debug route registration
console.log('Registering auth routes...');
router.use('/auth', authRoutes);
router.use('/products', productRoutes);

router.get('/test', (req, res) => {
    res.json({ message: 'API is working' });
});

module.exports = router; 