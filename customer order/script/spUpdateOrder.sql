CREATE PROCEDURE updateOrder (orderId VARCHAR(255), @orderStatus VARCHAR(255))
AS
BEGIN
    UPDATE customers
    SET orderStatus = @orderStatus
    WHERE orderId = @orderId
END