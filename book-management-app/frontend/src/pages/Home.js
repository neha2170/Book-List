import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './BoookList';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem('token');
      console.log(token,"token")
      if (!token) {
        setError('No token found. Please login.');
        navigate('/login'); // Redirect to login if no token
        return;
      }
      try {
        const res = await axios.get('http://localhost:5000/api/books',{ headers: { Authorization: `Bearer ${token}` },});
        setBooks(res.data);
      } catch (err) {
        setError('Failed to fetch books.');
        console.error(err);
      }
    };

    fetchBooks();
  }, []);

  //   useEffect(() => {
//     const fetchBooks = async () => {
//       const token = localStorage.getItem('token');
//       console.log(token,"token")
//       if (!token) {
//         setError('No token found. Please login.');
//         navigate('/login'); // Redirect to login if no token
//         return;
//       }

//       try {
//         const res = await axios.get('http://localhost:5000/api/books', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log(res,"res")
//         setBooks(res.data);
//       } catch (err) {
//         setError('Failed to fetch books.');
//         console.error(err.response?.data || err.message);
//       }
//     };

//     fetchBooks();
//   }, [navigate]);


  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-container">
      <h1>Book Collection</h1>
      <BookList books={books} setBooks={setBooks} />
    </div>
  );
}

export default Home;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import BookList from '../components/BookList';

// function Home() {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get('/api/books');
//         setBooks(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchBooks();
//   }, []);

//   return (
//     <div>
//       <h1>Book Collection</h1>
//       {/* <BookList books={books} /> */}
//     </div>
//   );
// }

// export default Home;
