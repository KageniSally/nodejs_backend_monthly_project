CREATE OR ALTER PROCEDURE getBooking(@id VARCHAR(255))
AS
BEGIN
SELECT *FROM Bookings WHERE id=@id
END