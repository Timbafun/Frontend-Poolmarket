import React from 'react';
import { Routes, Route } from "react-router-dom";

// Importações Corrigidas (Baseado na estrutura do seu repositório)
import Header from './components/Header'; // Components Header.js
import Home from './pages/Home'; // Pages Home.js
import Login from './pages/Login'; // Pages Login.js
import Register from './pages/Signup'; // Pages Signup.js (Assumindo que é o cadastro)
import UserArea from './pages/UserArea'; // Pages UserArea.js

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
        {/* Footer não existe no repo e foi removido */}
      </div>
    </AuthProvider>
  );
}

export default App;