CREATE OR ALTER PROCEDURE addTour(@id VARCHAR(255),@name VARCHAR(255),@destination VARCHAR(255),@description VARCHAR(255),@price INT)
AS
BEGIN
INSERT INTO Tours VALUES(@id,@name,@destination,@description,@price)
END