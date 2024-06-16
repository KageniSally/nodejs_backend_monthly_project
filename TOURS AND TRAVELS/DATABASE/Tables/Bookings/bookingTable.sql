USE Tours;
CREATE TABLE Bookings
(
    id VARCHAR(255) PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    starRating VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),

);