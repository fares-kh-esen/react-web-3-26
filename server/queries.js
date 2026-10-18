const pool = require('./db');


async function getAllBooks() {
  const [rows] = await pool.query('SELECT id, title, available FROM books');
  return rows;
}

async function getBookById(id) {
  const [rows] = await pool.query('SELECT id, title, available FROM books where id = ?' , [id]);
  return rows[0];
}

async function createBook(title, available = true) {
  const [result] = await pool.query('INSERT INTO books (title, available) VALUES (?, ?)', [title, available]);
  return getBookById(result.insertId);
}

module.exports = { getAllBooks , getBookById, createBook}