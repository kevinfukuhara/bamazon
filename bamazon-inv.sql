DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

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

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("couch","home",200,350,0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("bed","home",1100,350,0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("ps4","electronics",300,500,0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("nintendo-switch","electronics",330,600,0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("xbox-one","electronics",200,400,0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("meatballs","food",5,8000,0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("bananas","food",2,9000,0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("salmon","food",8,5000,0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("coffee","food",3,10000,0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("gold-bar","misc",10000,5,0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("lambo","misc",250000,2,0);
INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES ("helicopter","misc",400000,1,0);

SELECT * FROM products;

INSERT INTO departments(department_id, department_name, over_head_costs)
VALUES (1000,"home",1000000);
INSERT INTO departments(department_id, department_name, over_head_costs)
VALUES (2000,"food",50000);
INSERT INTO departments(department_id, department_name, over_head_costs)
VALUES (3000,"electronics",750000);
INSERT INTO departments(department_id, department_name, over_head_costs)
VALUES (4000,"misc",5000000);

SELECT * FROM departments;



