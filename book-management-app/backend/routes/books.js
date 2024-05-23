const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth');

// Create a new book
router.post('/', auth, async (req, res) => {
  const { title, author, genre, yearPublished } = req.body;
  const book = new Book({
    title,
    author,
    genre,
    yearPublished,
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a single book by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


// Update a book
router.put('/:id', auth, async (req, res) => {
  const { title, author, genre, yearPublished } = req.body;
  try {
    let book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });

    book.title = title;
    book.author = author;
    book.genre = genre;
    book.yearPublished = yearPublished;

    await book.save();
    res.json(book);
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete a single book by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Book not found' });

    res.json({ msg: 'Book removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
