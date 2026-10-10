-- ============================================================
-- Library Database — Seed Data
-- Programming Web Client 3 — Session 1 homework
-- Run this AFTER 01_structure.sql. Safe to run again any time
-- (it clears existing rows before inserting).
-- ============================================================

USE library_db;

-- Reset in FK-safe order (children first). DELETE is used instead of
-- TRUNCATE because MySQL refuses to TRUNCATE a table that is referenced
-- by a foreign key (error #1701), and phpMyAdmin re-enables FK checks.
DELETE FROM loans;
DELETE FROM books;
DELETE FROM authors;
DELETE FROM categories;
DELETE FROM members;

-- DELETE does not reset AUTO_INCREMENT, so do it explicitly
ALTER TABLE loans AUTO_INCREMENT = 1;
ALTER TABLE books AUTO_INCREMENT = 1;
ALTER TABLE authors AUTO_INCREMENT = 1;
ALTER TABLE categories AUTO_INCREMENT = 1;
ALTER TABLE members AUTO_INCREMENT = 1;

-- Categories
INSERT INTO categories (id, name, description) VALUES
(1, 'Science Fiction', 'Speculative fiction dealing with futuristic concepts'),
(2, 'Fantasy', 'Fiction involving magical or supernatural elements'),
(3, 'Classic Literature', 'Enduring works of literary merit'),
(4, 'Mystery', 'Fiction centered on solving a crime or puzzle'),
(5, 'Non-Fiction', 'Factual and informational works');

-- Authors
INSERT INTO authors (id, first_name, last_name, nationality) VALUES
(1, 'Isaac', 'Asimov', 'American'),
(2, 'Ursula', 'Le Guin', 'American'),
(3, 'Agatha', 'Christie', 'British'),
(4, 'George', 'Orwell', 'British'),
(5, 'Jane', 'Austen', 'British'),
(6, 'Yuval Noah', 'Harari', 'Israeli');

-- Books (category_id / author_id reference the rows above)
INSERT INTO books (id, title, isbn, publication_year, available, category_id, author_id) VALUES
(1, 'Foundation', '9780553293357', 1951, TRUE, 1, 1),
(2, 'I, Robot', '9780553294385', 1950, TRUE, 1, 1),
(3, 'A Wizard of Earthsea', '9780547773742', 1968, TRUE, 2, 2),
(4, 'The Left Hand of Darkness', '9780441478125', 1969, FALSE, 1, 2),
(5, 'Murder on the Orient Express', '9780062693662', 1934, TRUE, 4, 3),
(6, 'And Then There Were None', '9780062073488', 1939, TRUE, 4, 3),
(7, '1984', '9780451524935', 1949, FALSE, 1, 4),
(8, 'Animal Farm', '9780451526342', 1945, TRUE, 3, 4),
(9, 'Pride and Prejudice', '9780141439518', 1813, TRUE, 3, 5),
(10, 'Sense and Sensibility', '9780141439662', 1811, TRUE, 3, 5),
(11, 'Sapiens', '9780062316097', 2011, TRUE, 5, 6),
(12, 'Homo Deus', '9780062464316', 2015, FALSE, 5, 6);

-- Members
INSERT INTO members (id, first_name, last_name, email, registration_date) VALUES
(1, 'Amine', 'Trabelsi', 'amine.trabelsi@example.com', '2025-09-01'),
(2, 'Sarra', 'Ben Salah', 'sarra.bensalah@example.com', '2025-09-02'),
(3, 'Youssef', 'Gharbi', 'youssef.gharbi@example.com', '2025-09-05'),
(4, 'Nour', 'Jlassi', 'nour.jlassi@example.com', '2025-09-10'),
(5, 'Karim', 'Hammami', 'karim.hammami@example.com', '2025-09-12');

-- Loans — books 4, 7, 12 are on active loans (return_date NULL),
-- which matches their available = FALSE above. Books 1 and 9 were
-- borrowed and already returned, so they stay available = TRUE.
INSERT INTO loans (id, member_id, book_id, loan_date, return_date) VALUES
(1, 1, 4, '2025-09-15', NULL),
(2, 2, 7, '2025-09-16', NULL),
(3, 3, 12, '2025-09-18', NULL),
(4, 4, 1, '2025-09-10', '2025-09-20'),
(5, 5, 9, '2025-09-11', '2025-09-19');
