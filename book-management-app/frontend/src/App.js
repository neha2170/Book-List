import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import BookList from './pages/BoookList';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/books" element={<BookList />} />
      <Route path="/books/add" element={<AddBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
    </Routes>
  );
}

export default App;
