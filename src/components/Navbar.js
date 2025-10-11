import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <div>PoolMarket</div>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Cadastre-se</Link>
      </div>
    </div>
  );
}
