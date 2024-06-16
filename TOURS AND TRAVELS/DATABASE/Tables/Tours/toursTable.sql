USE Tours;
CREATE TABLE Tours (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    destination VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price INT
);
