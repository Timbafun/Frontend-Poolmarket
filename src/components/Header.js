import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importação do Contexto
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    // Puxa o estado e a função de logout do Contexto
    const { isAuthenticated, logout } = useAuth(); 

    return (
        <header className="header">
            <h1 onClick={() => navigate('/')}>PoolMarket</h1>
            <nav className="nav-links">
                {/* ✅ LÓGICA DE EXIBIÇÃO: MOSTRA BOTÕES DIFERENTES CONFORME O LOGIN */}
                {isAuthenticated ? (
                    <>
                        <button onClick={() => navigate('/user-area')} className="nav-button">
                            Área do Usuário
                        </button>
                        <button onClick={logout} className="nav-button">
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