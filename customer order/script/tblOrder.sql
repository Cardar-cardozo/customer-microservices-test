CREATE TABLE IF NOT EXISTS orders(
   orderId VARCHAR(255) PRIMARY KEY,
   customerId VARCHAR(255) NOT NULL
   itemId VARCHAR(255) NOT NULL
   price VARCHAR(255) NOT NULL,
   dateCreate TIMESTAMP,
   timeCreate TIMESTAMP,
   orderStatus VARCHAR(255),
);