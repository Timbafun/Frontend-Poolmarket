import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-poolmarket.onrender.com";

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BACKEND_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), senha, cpf: cpf.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        login(data.user); // login automático após cadastro
        alert("✅ Cadastro efetuado com sucesso!");

        // Redireciona direto para votação se não votou ainda
        if (!data.user.hasVoted) {
          navigate("/"); // rota da votação
        } else {
          navigate("/user-area");
        }
      } else {
        alert(data.message || "❌ Erro no cadastro.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao tentar cadastrar.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSignup}>
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
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <button type="submit" className="auth-button">Cadastrar</button>
      </form>
    </div>
  );
}
