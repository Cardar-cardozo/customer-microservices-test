DELIMITER //

CREATE PROCEDURE insert_customer
(
   id VARCHAR(255) PRIMARY KEY,
   firstName VARCHAR(255) NOT NULL,
   lastName VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
)
AS
BEGIN
    INSERT INTO orders (id, firstName, lastName, email, password)
    VALUES (@id, @firstName, @lastName, @email, @password)
    -- SELECT * FROM customers WHERE email = @email
    COMMIT
END

DELIMITER ;