const User = require('../models/user');
const logger = require('../utils/logger');

const authController = {
    async register(req, res) {
        try {
            logger.info('Register attempt', { email: req.body.email });
            
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
            
            // Check if user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                logger.warn('Registration failed - Email already exists', { email });
                return res.status(400).json({ message: 'Email already registered' });
            }

            // Create new user
            const user = await User.create({ email, password });
            const token = user.generateAuthToken();

            logger.info('User registered successfully', { email });
            res.status(201).json({
                message: 'User registered successfully',
                token
            });
        } catch (error) {
            logger.error('Registration error', { error: error.message });
            res.status(400).json({ message: error.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findByCredentials(email, password);
            const token = user.generateAuthToken();

            res.json({
                message: 'Logged in successfully',
                token
            });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
};

module.exports = authController; 