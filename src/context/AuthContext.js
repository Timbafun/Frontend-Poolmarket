import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Necessário se você quiser redirecionar o logout

const AuthContext = createContext();

// Chave para armazenar no localStorage
const AUTH_STORAGE_KEY = 'poolmarketUser'; 

export function AuthProvider({ children }) {
    // 1. ✅ CORREÇÃO: Inicializa o estado 'user' LENDO diretamente do localStorage.
    // Isso garante que o estado de login esteja correto desde a primeira renderização.
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        // Se houver dados, retorna o objeto JSON, senão, retorna null
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const navigate = useNavigate();

    // 2. Login: salva estado e localStorage
    const login = (userData) => {
        if (!userData || !userData.token) {
             console.error("Dados de usuário inválidos para login.");
             return;
        }
        setUser(userData);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    };

    // 3. Logout: limpa estado e localStorage
    const logout = () => {
        setUser(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
        // ✅ ADIÇÃO: Redireciona o usuário para a página inicial (ou login) após sair
        navigate('/'); 
    };

    // 4. ✅ SIMPLIFICAÇÃO: A autenticação é derivada do estado do usuário.
    // isAuthenticated é true se o objeto user não for null
    const isAuthenticated = !!user; 

    // O useEffect original que você tinha não é mais necessário aqui, 
    // pois a inicialização já carrega os dados.
    // Mantenho este useEffect apenas como boa prática para sincronizar abas.
    useEffect(() => {
        const handleStorageChange = () => {
             const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
             setUser(storedUser ? JSON.parse(storedUser) : null);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}