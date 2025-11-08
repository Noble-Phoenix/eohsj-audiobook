/// <reference lib="dom" />
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Ensure this is .tsx
import './i18n'; 

ReactDOM.createRoot(document.getElementById('root')!).render( // Add '!' for non-null assertion
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);