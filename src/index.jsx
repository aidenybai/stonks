import { createRoot } from 'react-dom/client';
import React, { StrictMode } from 'react';
import App from './App';
import './main.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
