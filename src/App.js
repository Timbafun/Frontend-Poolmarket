import React from 'react';
import { Routes, Route } from "react-router-dom";

// ✅ CORREÇÃO 1: Importa o Header.js diretamente (corrigido na última tentativa)
import Header from './components/Header'; 
// ✅ CORREÇÃO 2: Importa o Footer.js diretamente!
import Footer from './components/Footer'; 

import Home from './components/Home/Home';
import Register from './components/auth/Register';
import Login from './pages/Login'; 
import UserArea from './components/UserArea/UserArea'; 
import { AuthProvider } from './context/AuthContext'; 

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-area" element={<UserArea />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;