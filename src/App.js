import React from 'react';
import { Routes, Route } from "react-router-dom";

// 1. Header (Caminho corrigido)
import Header from './components/Header'; 
// 2. Home (CORRIGIDO AGORA)
import Home from './components/Home'; // Assumindo que o arquivo é './components/Home.js'
// 3. Register (Caminho mantido)
import Register from './components/auth/Register'; 
// 4. Login (Caminho corrigido para 'pages')
import Login from './pages/Login'; 
// 5. UserArea (Caminho mantido)
import UserArea from './components/UserArea/UserArea'; 
// 6. Footer foi removido (porque não existia)

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
        {/* Footer foi removido */}
      </div>
    </AuthProvider>
  );
}

export default App;