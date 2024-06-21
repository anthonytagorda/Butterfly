-- Create and use the database
DROP DATABASE IF EXISTS butterfly;
CREATE DATABASE IF NOT EXISTS butterfly;
USE butterfly;

-- Table for client credentials
DROP TABLE IF EXISTS `client_credentials`;
CREATE TABLE `client_credentials` (
  `client_id` INT NOT NULL PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;