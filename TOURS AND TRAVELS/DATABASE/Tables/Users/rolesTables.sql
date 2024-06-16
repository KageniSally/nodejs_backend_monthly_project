USE Tours

CREATE TABLE Roles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    role_name VARCHAR(255) UNIQUE NOT NULL
);


INSERT INTO Roles (role_name) VALUES ('Customer'), ('Admin'), ('Manager');
DELETE FROM Roles WHERE role_name = 'Manager';

