import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookDetail({ match }) {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/api/books/${match.params.id}`);
        setBook(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBook();
  }, [match.params.id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Year Published: {book.yearPublished}</p>
    </div>
  );
}

export default BookDetail;
