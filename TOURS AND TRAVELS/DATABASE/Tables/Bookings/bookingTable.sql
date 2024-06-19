USE Tours;
CREATE TABLE Bookings
(
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    tour_id VARCHAR(255),
    hotel_id VARCHAR(255),
    isEmailSent INT DEFAULT 0,
    date DATETIME2
        FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (tour_id) REFERENCES Tours(id),
    FOREIGN KEY (hotel_id) REFERENCES Hotels(id),
);