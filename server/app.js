const express = require('express');
const { getAllBooks , getBookById, createBook } = require('./queries');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/books', async (req, res) => {

  const books = await getAllBooks(); 

  res.json(books);
});

app.get('/api/books/:id', async (req, res) => {


  const id = req.params.id;
  const books = await getBookById(id);

  res.json(books);
});


app.post('/api/books', async (req, res) => {
  const { title, available } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const book = await createBook(title, available);
  res.status(201).json(book);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

