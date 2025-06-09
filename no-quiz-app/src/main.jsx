// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'; // Este é o SEU NOVO App.jsx com as rotas
import './global.css'; //

// Seus GlobalStyles e script do Tailwind:
// O script do Tailwind é carregado no QuizPage.jsx. Se quiser em todas as páginas,
// considere movê-lo para o index.html principal do Vite ou para o novo App.jsx.
// O GlobalStyles também, como discutido acima.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);