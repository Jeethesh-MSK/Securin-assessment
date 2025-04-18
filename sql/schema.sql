CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cuisine VARCHAR(255),
    title VARCHAR(255),
    rating FLOAT,
    prep_time INT,
    cook_time INT,
    total_time INT,
    description TEXT,
    nutrients JSON,
    serves VARCHAR(100)
);


