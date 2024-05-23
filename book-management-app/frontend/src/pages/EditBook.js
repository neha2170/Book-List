import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditBook.css';

function EditBook() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [yearPublished, setYearPublished] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please login.');
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const book = res.data;
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setYearPublished(book.yearPublished);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch book details.');
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please login.');
        return;
      }

      await axios.put(
        `/api/books/${id}`,
        { title, author, genre, yearPublished },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/books');
    } catch (err) {
      console.error(err);
      setError('Failed to update book.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="edit-book-container">
      <h1>Edit Book</h1>
      <form onSubmit={handleSubmit} className="edit-book-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Year Published"
          value={yearPublished}
          onChange={(e) => setYearPublished(e.target.value)}
          required
        />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}

export default EditBook;
