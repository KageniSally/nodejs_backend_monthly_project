CREATE OR ALTER PROCEDURE updateHotel(@id VARCHAR(255),
    @name VARCHAR(255),
    @location VARCHAR(255),
    @starRating VARCHAR(255))
AS
BEGIN
    UPDATE Hotels SET name=@name,location=@location,starRating=@starRating
WHERE id=@id
END