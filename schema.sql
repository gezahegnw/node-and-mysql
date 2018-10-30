CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100),
  price DECIMAL(10,4),
  stock_quantity INT  DEFAULT 0,
  product_sales DECIMAL(10,4) DEFAULT 0.00,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments(
  department_id INTNOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  overhead_costs DECIMAL(10,4) DEFAULT 0.00,
  total_sales DECIMAL(10,4) DEFAULT 0.00,
  PRIMARY KEY (department_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
	("Fire TV Stick with Alexa Voice Remote", "Electronics", 39.99, 50), 
    ("Red Dead Redemption 2-Xbox One", "Video Games", 59.96, 100), 
    ("The Wonky Donkey", "Books", 7.13, 300),
    ("Vrem Countertop ice Maker", "Appliances", 134.99, 40), 
    ("ANCEL AD310 Classic Enchanced Univeral OBD II", "Automotive", 34.99, 100),
    ("ThermpPro TP65 Digital Wireless Hygrometer", "Baby", 22.09, 500),
    ("Yootech Wireless Charger Qi-Certified 7.5W", "Cell Phones and Accessories", 14.99, 450),
    ("Microsoft Surface Dock (PD9-00003)", "Computers and Accessories", 125.99, 54),
    ("AmazonBasics Stainless Steel Electric Kettle - 1-Liter", "Home and Kitchen", 17.70, 80),
    ("Ring Video Doorbell 2", 199.00, 70);
    
  SELECT * FROM products;
    
	UPDATE products SET stock_quantity = stock_quantity + 10 WHERE item_id = 1;   
    
    