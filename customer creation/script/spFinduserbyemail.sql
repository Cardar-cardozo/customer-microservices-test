    -- DROP PROCEDURE  IF EXISTS findUserByEmail;
    CREATE PROCEDURE `findUserByEmail`(IN email VARCHAR(255))
    begin
        SELECT * FROM   users WHERE  email = email;
    END
