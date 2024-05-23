import React from 'react';
import { createRoot } from 'react-dom/client'; // Import from react-dom/client
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Create root

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
