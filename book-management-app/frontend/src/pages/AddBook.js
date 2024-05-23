import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddBook.css';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [yearPublished, setYearPublished] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please login.');
      }

      await axios.post('/api/books', { title, author, genre, yearPublished }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/books');
    } catch (err) {
      console.error('Failed to add book', err);
    }
  };

  return (
    <div className="add-book-container">
      <h1>Add Book</h1>
      <form className="add-book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Year Published"
          value={yearPublished}
          onChange={(e) => setYearPublished(e.target.value)}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function AddBook() {
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [genre, setGenre] = useState('');
//   const [yearPublished, setYearPublished] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token'); // Retrieve the token from local storage

//     try {
//        await axios.post('/api/books', {
//         title,
//         author,
//         genre,
//         yearPublished
//       }, {
//         headers: {
//           'Authorization': `Bearer ${token}` // Include the token in the headers
//         }
//       });
//       navigate('/books');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h1>Add Book</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Author"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Genre"
//           value={genre}
//           onChange={(e) => setGenre(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Year Published"
//           value={yearPublished}
//           onChange={(e) => setYearPublished(e.target.value)}
//         />
//         <button type="submit">Add Book</button>
//       </form>
//     </div>
//   );
// }

// export default AddBook;
