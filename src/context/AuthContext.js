import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Cria o Contexto
const AuthContext = createContext();

// 2. Cria o Provider que gerencia o estado e o localStorage
export const AuthProvider = ({ children }) => {
  // Inicializa o estado lendo o localStorage na primeira montagem
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Função para logar (usada no Login.js)
  const login = (userData) => {
    // Certifica-se de que a resposta do backend é um objeto com dados.
    if (!userData || !userData.email) {
        console.error("Dados de usuário inválidos recebidos para login.");
        return;
    }
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Função para deslogar (usada no Header.js)
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Redireciona para a página inicial (ou login) após o logout
    window.location.href = '/'; 
  };

  // Garante que o estado é sincronizado se houver mudanças no localStorage (ex: em outras abas)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook customizado para facilitar o uso nos componentes
export const useAuth = () => {
  return useContext(AuthContext);
};