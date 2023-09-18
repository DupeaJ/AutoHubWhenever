CREATE TABLE CarDetails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    fuelType VARCHAR(50),
    drive VARCHAR(50),
    cylinders INT,
    transmission VARCHAR(50),
    make VARCHAR(50),
    model VARCHAR(50),
    year INT,
    oilQues INT,
    tireQues INT,
    FOREIGN KEY (userId) REFERENCES Users(id)
);
