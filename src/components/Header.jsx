import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">PoolMarket</div>
      <nav className="nav-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Cadastro</Link>
      </nav>
    </header>
  );
};

export default Header;
