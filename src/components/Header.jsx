import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ user, onLogout }) {
  const nav = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    nav(-1);
  };

  return (
    <header>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <h1 style={{ cursor: "pointer" }} onClick={() => nav("/")}>PoolMarket</h1>
      </div>
      <nav>
        <a href="#" onClick={handleBack}>Voltar</a>
        {user ? (
          <>
            <Link to="/user">Área do Usuário</Link>
            <a href="#" onClick={() => { onLogout(); window.location.href = "/"; }}>Sair</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Cadastro</Link>
          </>
        )}
      </nav>
    </header>
  );
}
