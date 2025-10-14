import React from 'react';
import { Routes, Route } from "react-router-dom";

// Importa o Header.js que está em src/components/Header.js
import Header from './components/Header'; 
// O Footer não existe, então ele é removido daqui!
// import Footer from './components/Footer'; // REMOVIDO

// Importa os componentes de página
import Home from './components/Home/Home'; // Ou './pages/Home' se você o moveu para lá
import Register from './components/auth/Register'; // Manter o caminho original
import Login from './pages/Login'; // O caminho corrigido que definimos
import UserArea from './components/UserArea/UserArea'; // Manter o caminho original

// Importação do Contexto
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
        {/* O Footer foi removido do JSX para corrigir o erro */}
        {/* <Footer /> */} 
      </div>
    </AuthProvider>
  );
}

export default App;