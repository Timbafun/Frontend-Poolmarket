import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // 1. O estado de login é inicializado como 'null' para indicar que a verificação está pendente.
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Novo estado de carregamento

    // 🔑 2. EFEITO CRÍTICO: Carrega o usuário do localStorage ao iniciar
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Erro ao carregar usuário do localStorage:", error);
            localStorage.removeItem('user');
        } finally {
            setIsLoading(false); // A verificação inicial terminou
        }
    }, []); 

    // 3. Função de Login
    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        // CRÍTICO: Salva o objeto completo do usuário (incluindo o token) no localStorage
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // 4. Função de Logout
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        isAuthenticated,
        isLoading, // Passamos o estado de carregamento
        login,
        logout,
    };

    // 5. Renderiza apenas quando o carregamento inicial termina
    if (isLoading) {
        // Você pode retornar um spinner ou null aqui enquanto o estado é verificado
        return <div>Carregando sessão...</div>;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};