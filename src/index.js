// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/globals.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';

console.log('🚀 index.js loaded');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

console.log('🎉 ReactDOM.render called');
