CREATE OR ALTER PROCEDURE updateBooking(
    @id VARCHAR(255),
    @tour_id VARCHAR(255),
    @hotel_id VARCHAR(255),
    @date DATETIME2
)
AS
BEGIN
UPDATE Bookings SET tour_id=@tour_id,hotel_id=@hotel_id,date=@date WHERE id=@id
END