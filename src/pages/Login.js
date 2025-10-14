import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// ✅ CORREÇÃO: Apenas um '../' para ir de 'pages' para 'src' e depois para 'context'
import { useAuth } from "../context/AuthContext"; 
import "./Auth.css"; // Mantenha o seu caminho original para o CSS

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 
  
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-poolmarket.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Tentando login com:", { email, senha });

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
        console.error("🚨 Resposta não-JSON:", text);
        alert("Resposta inválida do servidor. Verifique console.");
        return;
      }

      console.log("📡 Resposta do backend:", res.status, data);

      if (res.ok && data.ok) {
        login(data.user);
        alert("✅ Login efetuado com sucesso!");
        navigate("/"); // Redirecionamento para a página inicial
      } else {
        alert(data.message || "❌ Credenciais inválidas.");
      }
    } catch (err) {
      console.error("🔥 Erro no fetch /api/login:", err);
      alert("Erro ao tentar logar. Veja console para detalhes.");
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