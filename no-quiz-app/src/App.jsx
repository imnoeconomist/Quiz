import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuizPage from './QuizPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </>
  );
}

export default App;