import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ✅ Imports ajustados com maiúsculas/minúsculas corretas
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';

// ✅ Import do CSS global (se necessário)
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
