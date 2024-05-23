// src/components/BookList.js

import React, { useEffect, useState } from 'react';
import { getAllBooks, deleteBook } from '../api';
import Book from './Book';
import '../styles.css'; // Import styles

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const allBooks = await getAllBooks();
      setBooks(allBooks);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      loadBooks();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="BookList">
      <h2>Book List</h2>
      {error && <p className="error">Error: {error}</p>}
      <div>
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <Book book={book} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
