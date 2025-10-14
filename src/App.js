import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Register from './components/auth/Register';
import Login from './pages/Login'; // Garanta que está importando de 'pages'
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
          {/* Mantenha suas outras rotas aqui */}
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;