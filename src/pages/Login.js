import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  // Pega login e o status de autenticação
  const { login, isAuthenticated } = useAuth();
  
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-poolmarket.onrender.com";

  // ✅ CORREÇÃO 1: Redireciona se o usuário JÁ ESTIVER AUTENTICADO
  // Isso impede que um usuário logado acesse a página de Login.
  useEffect(() => {
      if (isAuthenticated) {
          navigate("/");
      }
  }, [isAuthenticated, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Impede submissão se o AuthContext ainda estiver verificando o localStorage (caso raro)
    if (!isAuthenticated && isAuthenticated !== false) return; 

    try {
      const res = await fetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), senha }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        // ✅ PERSISTÊNCIA: Login efetuado e dados armazenados
        login(data.user); 
        alert("✅ Login efetuado com sucesso!");

        // Redirecionamento baseado na regra de negócio
        if (!data.user.hasVoted) {
          navigate("/"); 
        } else {
          navigate("/user-area"); 
        }
      } else {
        alert(data.message || "❌ Credenciais inválidas.");
      }
    } catch (err) {
      console.error("🔥 Erro de conexão ou CORS:", err);
      // ✅ MELHORIA: Ajuda a diagnosticar o problema de CORS, se ele persistir.
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
          alert("Erro de conexão. Verifique se o servidor backend está online e se a configuração CORS está correta.");
      } else {
          alert("Erro ao tentar logar.");
      }
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