DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10),
    product_sales DECIMAL(10,2),
    PRIMARY KEY(item_id)
);

CREATE TABLE departments (
    department_id INT NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(10,2),
    PRIMARY KEY(department_id)
);

-- INSERT INTO products(item_id, product_name, department_name, price)
SELECT * FROM products;