DELIMITER //

CREATE PROCEDURE insert_customer
(
   orderId VARCHAR(255) PRIMARY KEY,
   customerId VARCHAR(255) NOT NULL
   itemId VARCHAR(255) NOT NULL
   price VARCHAR(255) NOT NULL,
)
AS
BEGIN
    INSERT INTO orders (orderId, customerId, itemId, price)
    VALUES (@orderId, @customerId, @itemId, @price)
    -- SELECT * FROM customers WHERE email = @email
    COMMIT
END

DELIMITER ;