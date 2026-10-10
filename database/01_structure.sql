-- ============================================================
-- Library Database — Table Structure
-- Programming Web Client 3 — Session 1 homework
-- Run this file FIRST to create the schema (drops it if it already exists).
-- ============================================================

DROP DATABASE IF EXISTS library_db;
CREATE DATABASE library_db;
USE library_db;

-- Parent tables first (no foreign keys)

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE authors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  nationality VARCHAR(50)
);

CREATE TABLE members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE,
  registration_date DATE
);

-- Child tables next (reference the tables above)

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  isbn VARCHAR(20),
  publication_year INT,
  available BOOLEAN DEFAULT TRUE,
  category_id INT,
  author_id INT,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

CREATE TABLE loans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  member_id INT NOT NULL,
  book_id INT NOT NULL,
  loan_date DATE NOT NULL,
  return_date DATE,
  FOREIGN KEY (member_id) REFERENCES members(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);
