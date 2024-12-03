const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

// Static methods for common queries
Product.findByPriceRange = async function(minPrice, maxPrice) {
    return await this.findAll({
        where: {
            price: {
                [sequelize.Op.between]: [minPrice, maxPrice]
            }
        }
    });
};

Product.findLatestProducts = async function(limit = 10) {
    return await this.findAll({
        order: [['createdAt', 'DESC']],
        limit
    });
};

module.exports = Product; 