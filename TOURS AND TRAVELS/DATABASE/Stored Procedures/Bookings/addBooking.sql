CREATE OR ALTER PROCEDURE addBooking(
    @id VARCHAR(255),
    @user_id VARCHAR(255),
    @tour_id VARCHAR(255),
    @hotel_id VARCHAR(255),
    @date DATETIME2
)
AS
BEGIN
INSERT INTO Bookings VALUES(@id,@user_id,@tour_id,@hotel_id,@date)
END