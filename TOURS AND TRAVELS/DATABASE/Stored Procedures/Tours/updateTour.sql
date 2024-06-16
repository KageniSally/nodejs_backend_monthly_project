CREATE OR ALTER PROCEDURE updateTour(
    @id VARCHAR(255),
    @name VARCHAR(255),
    @destination VARCHAR(255),
    @description VARCHAR(255),
    @price INT
)
AS
BEGIN
UPDATE Tours SET name=@name,destination=@destination, description=@description,price=@price WHERE id=@id
END