import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth(); // ✅ agora `user` e `isAuthenticated` vêm do contexto

    return (
        <header className="header">
            <h1 onClick={() => navigate('/')}>PoolMarket</h1>
            <nav className="nav-links">
                {isAuthenticated ? (
                    <>
                        <button onClick={() => navigate('/user-area')} className="nav-button">
                            Área do Usuário
                        </button>
                        <button
                            onClick={() => {
                                logout();
                                navigate('/');
                            }}
                            className="nav-button"
                        >
                            Sair
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate('/login')} className="nav-button">
                            Login
                        </button>
                        <button onClick={() => navigate('/register')} className="nav-button">
                            Cadastro
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
