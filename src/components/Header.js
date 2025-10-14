import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import './Header.css';

const Header = () => {
    // Usamos useNavigate apenas para o h1/logo, se preferir o clique
    const navigate = useNavigate();
    // Pega o status de autenticação e a função de logout
    const { isAuthenticated, logout } = useAuth(); 

    return (
        <header className="header">
            {/* Usamos o componente Link para navegação */}
            <h1 onClick={() => navigate('/')}>
                <Link to="/" className="logo-link">PoolMarket</Link>
            </h1>
            <nav className="nav-links">
                {isAuthenticated ? (
                    // ✅ MOSTRA SE AUTENTICADO
                    <>
                        <Link to="/user-area" className="nav-button">
                            Área do Usuário
                        </Link>
                        <button
                            onClick={logout} // ✅ CORREÇÃO: A função logout já redireciona no AuthContext!
                            className="nav-button"
                        >
                            Sair
                        </button>
                    </>
                ) : (
                    // ✅ MOSTRA SE NÃO AUTENTICADO
                    <>
                        <Link to="/login" className="nav-button">
                            Login
                        </Link>
                        <Link to="/register" className="nav-button">
                            Cadastro
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;