USE Tours;
CREATE TABLE Users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isDeleted INT DEFAULT 0,
    isEmailSent INT DEFAULT 0,
    role_id INT DEFAULT 1,
    FOREIGN KEY (role_id) REFERENCES Roles(id)
);
