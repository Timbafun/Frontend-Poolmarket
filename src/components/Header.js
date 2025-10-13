import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-text">PoolMarket</Link>
      </div>
      <nav className="nav-links">
        <Link to="/login">Login</Link>
        <Link to="/signup">Cadastro</Link>
      </nav>
    </header>
  );
}
