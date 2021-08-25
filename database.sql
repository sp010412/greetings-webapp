-- CREATE DATABASE greetings;

CREATE TABLE greetednames (
    id SERIAL PRIMARY KEY,
    userName VARCHAR(100) NOT NULL,
    count int NOT NULL
);
