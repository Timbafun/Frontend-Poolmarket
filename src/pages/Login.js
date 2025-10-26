import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-poolmarket.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), senha: senha.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data); 

        alert("✅ Login efetuado com sucesso!");

        if (!data.hasVoted) {
          navigate("/");
        } else {
          navigate("/user-area");
        }
      } else {
        alert(data.message || "❌ Erro ao tentar logar.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de comunicação ao tentar logar.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit" className="auth-button">Entrar</button>
      </form>
    </div>
  );
}