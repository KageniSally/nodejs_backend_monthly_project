CREATE OR ALTER PROCEDURE deleteBooking(@id VARCHAR(255))
AS
BEGIN
    DELETE FROM Bookings WHERE id=@id
END