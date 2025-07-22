CREATE DATABASE time_to_sec;

USE time_to_sec;

CREATE TABLE login (
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (email)
);