import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/storage"; // usa storage
import "./Header.css";

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const user = getCurrentUser();
      setIsLogged(!!user);
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);

    return () => window.removeEventListener("storage", checkLogin);
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
