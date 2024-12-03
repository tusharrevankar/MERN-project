const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        retry: {
            max: 5,
            match: [
                /SequelizeConnectionError/,
                /SequelizeConnectionRefusedError/,
                /SequelizeHostNotFoundError/,
                /SequelizeConnectionTimedOutError/,
                /SequelizeConnectionAcquireTimeoutError/,
                /SequelizeConnectionError: connect ECONNREFUSED/
            ],
            backoffBase: 1000,
            backoffExponent: 1.5,
        }
    }
);

async function initializeDatabase() {
    try {
        // Test database connection
        await sequelize.authenticate();
        logger.info('Database connection established successfully.');

        // Read the SQL file
        const sqlPath = path.join(__dirname, 'init.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        // Split the SQL file into individual statements
        const statements = sql.split(';').filter(statement => statement.trim());

        // Execute each statement with error handling
        for (const statement of statements) {
            if (statement.trim()) {
                try {
                    await sequelize.query(statement, {
                        raw: true,
                        type: Sequelize.QueryTypes.RAW
                    });
                } catch (error) {
                    // Ignore duplicate entry errors for sample data
                    if (error.name === 'SequelizeUniqueConstraintError' || 
                        (error.original && error.original.code === 'ER_DUP_ENTRY')) {
                        logger.info('Skipping duplicate entry in initialization');
                        continue;
                    }
                    throw error;
                }
            }
        }

        logger.info('Database initialized with sample data');
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError' || 
            (error.original && error.original.code === 'ER_DUP_ENTRY')) {
            logger.info('Sample data already exists, continuing...');
        } else {
            logger.error('Error initializing database:', error);
            throw error;
        }
    }
}

module.exports = { 
    sequelize,
    initializeDatabase
}; 