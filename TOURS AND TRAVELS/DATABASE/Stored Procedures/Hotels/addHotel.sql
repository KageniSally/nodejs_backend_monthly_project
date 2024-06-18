CREATE OR ALTER PROCEDURE addHotel(
    @id VARCHAR(255),
    @name VARCHAR(255),
    @location VARCHAR(255),
    @starRating VARCHAR(255)
)
AS
BEGIN
INSERT INTO Hotels VALUES(@id,@name,@location,@starRating)
END