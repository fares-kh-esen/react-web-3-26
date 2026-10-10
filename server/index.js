

const mysql = require('mysql2/promise');
require('dotenv').config();

// Create the pool once at application startup test
const pool = mysql.createPool({
  connectionLimit : 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

async function getAllBooks() {
  const [rows] = await pool.query('SELECT id, title, available FROM books');
  return rows;
}

async function main() {
  try {
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASSWORD);
    console.log(process.env.DB_DATABASE);


    console.log('--- Connection test ---');
    const conn = await pool.getConnection();
    console.log('Connected to MySQL ✓');
    conn.release();

    console.log('\n--- All books ---');
    console.log(await getAllBooks());

  } catch (error) {
    console.error('Something went wrong:', error.message);
  } finally {
    await pool.end();
  }
}

main();
