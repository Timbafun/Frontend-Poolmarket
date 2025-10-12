import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/storage";

export default function Header() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">PoolMarket</Link>
      </div>

      <div className="header-right">
        {user ? (
          <>
            <span className="user-name">Olá, {user.nome}</span>
            <button className="btn secondary" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn outline">Cadastro</Link>
          </>
        )}
      </div>
    </header>
  );
}
