DELIMITER //

CREATE PROCEDURE FindById(
	IN orderId VARCHAR(255)
)
BEGIN
	SELECT * 
 	FROM orders
	WHERE orderId = orderId;
END //

DELIMITER ;