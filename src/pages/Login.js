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
        body: JSON.stringify({ email: email.trim(), senha: senha }),
      });

      const text = await res.text();
      let data;
      try { 
        data = JSON.parse(text); 
      } catch {
        alert("Resposta inválida do servidor.");
        return;
      }

      if (res.ok && data.ok) {
        login(data.user); // salva no localStorage e contexto
        alert("✅ Login efetuado com sucesso!");
        navigate("/"); // redireciona para página inicial
      } else {
        alert(data.message || "❌ Credenciais inválidas.");
      }
    } catch (err) {
      alert("Erro ao tentar logar. Veja console.");
      console.error(err);
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
