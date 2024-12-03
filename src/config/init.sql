-- Create Users Table
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Products Table
CREATE TABLE IF NOT EXISTS Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert Sample Products
INSERT INTO Products (name, description, price) VALUES
    ('iPhone 13', 'Latest Apple smartphone with A15 Bionic chip', 999.99),
    ('Samsung Galaxy S21', '5G Android smartphone with 120Hz display', 899.99),
    ('MacBook Pro', '14-inch MacBook Pro with M1 Pro chip', 1999.99),
    ('Dell XPS 13', 'Premium ultrabook with Intel Core i7', 1299.99),
    ('iPad Air', '10.9-inch iPad with M1 chip', 599.99),
    ('AirPods Pro', 'Wireless earbuds with active noise cancellation', 249.99),
    ('Sony WH-1000XM4', 'Wireless noise-cancelling headphones', 349.99),
    ('Nintendo Switch', 'Hybrid gaming console', 299.99),
    ('PS5', 'Sony PlayStation 5 gaming console', 499.99),
    ('Xbox Series X', 'Microsoft Xbox Series X gaming console', 499.99);

-- Insert Sample User (password: 'password123' - hashed)
INSERT INTO Users (email, password) VALUES
    ('test@example.com', '$2a$10$6jXzYyNrV.h991RoiNRlxuH5hDWEuVEE6jUJZX1zHOIWsGGWxYmQi'); 