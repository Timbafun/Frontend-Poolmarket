import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // Verifica se existe usuário logado no localStorage
    const user = localStorage.getItem("user");
    setIsLogged(!!user);
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-text">PoolMarket</Link>
      </div>
      <nav className="nav-links">
        {isLogged ? (
          <Link to="/user-area" className="nav-button">Área do Usuário</Link>
        ) : (
          <>
            <Link to="/login" className="nav-button">Login</Link>
            <Link to="/signup" className="nav-button">Cadastro</Link>
          </>
        )}
      </nav>
    </header>
  );
}
