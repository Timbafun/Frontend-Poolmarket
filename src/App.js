import React from 'react';
import { Routes, Route } from "react-router-dom";

// ✅ CORREÇÃO AQUI: Importa diretamente o Header.js da pasta components
import Header from './components/Header'; // O React entende que é o 'Header.js'
// OU:
// import Header from './components/Header.js';

import Footer from './components/Footer/Footer';
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