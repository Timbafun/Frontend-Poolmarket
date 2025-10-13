import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ✅ Imports ajustados com os nomes reais
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
