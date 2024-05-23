import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookList.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please login.');
        return;
      }

      try {
        const res = await axios.get('/api/books', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(res.data);
      } catch (err) {
        setError('Failed to fetch books.');
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please login.');
        return;
      }

      await axios.delete(`/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(books.filter(book => book._id !== id));
    } catch (err) {
      console.error('Failed to delete book', err);
      setError('Failed to delete book.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="book-list">
      <button className="add-button" onClick={() => navigate('/books/add')}>Add Book</button>
      {books.length > 0 ? (
        books.map(book => (
          <div key={book._id} className="book-item">
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <Link to={`/books/edit/${book._id}`} className="edit-button">Edit</Link>
            <button onClick={() => deleteBook(book._id)} className="delete-button">Delete</button>
          </div>
        ))
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
}

export default BookList;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './BookList.css';

// function BookList() {
//   const [books, setBooks] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchBooks = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('No token found. Please login.');
//         return;
//       }

//       try {
//         const res = await axios.get('/api/books', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setBooks(res.data);
//       } catch (err) {
//         setError('Failed to fetch books.');
//         console.error(err);
//       }
//     };

//     fetchBooks();
//   }, []);

//   const deleteBook = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('No token found. Please login.');
//         return;
//       }

//       await axios.delete(`/api/books/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBooks(books.filter(book => book._id !== id));
//     } catch (err) {
//       console.error('Failed to delete book', err);
//       setError('Failed to delete book.');
//     }
//   };

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="book-list">
//       {books.length > 0 ? (
//         books.map(book => (
//           <div key={book._id} className="book-item">
//             <h2>{book.title}</h2>
//             <p>{book.author}</p>
//             <Link to={`/books/edit/${book._id}`} className="edit-button">Edit</Link>
//             <button onClick={() => deleteBook(book._id)} className="delete-button">Delete</button>
//           </div>
//         ))
//       ) : (
//         <p>No books available.</p>
//       )}
//     </div>
//   );
// }

// export default BookList;
