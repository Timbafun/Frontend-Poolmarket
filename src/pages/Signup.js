import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// ✅ CORREÇÃO 1: Importamos o AuthContext para fazer o login
import { useAuth } from "../context/AuthContext"; 
import "./Auth.css";

export default function Signup() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", cpf: "", senha: "", confirmar: "" });
  const navigate = useNavigate();
  // ✅ CORREÇÃO 2: Pegamos a função 'login' do contexto
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação de senha
    if (form.senha !== form.confirmar) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-poolmarket.onrender.com";

      const response = await fetch(`${BACKEND_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          telefone: form.telefone,
          cpf: form.cpf,
          senha: form.senha 
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        // ✅ CORREÇÃO CRÍTICA: Conecta o usuário imediatamente e persiste o login.
        // O backend DEVE retornar o objeto do usuário (incluindo o token) em data.user
        login(data.user); 
        alert("✅ Cadastro efetuado com sucesso e login realizado!");
        navigate("/"); // Redireciona mantendo o estado logado
      } else {
        alert(data.message || "Erro ao cadastrar usuário. Tente novamente.");
      }
    } catch (err) {
      console.error("🔥 Erro no fetch /api/register:", err);
      alert("Erro ao cadastrar usuário. Verifique sua conexão ou a disponibilidade do servidor.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome completo" name="nome" onChange={handleChange} required />
        <input type="email" placeholder="E-mail" name="email" onChange={handleChange} required />
        <input type="text" placeholder="Telefone" name="telefone" onChange={handleChange} required />
        <input type="text" placeholder="CPF" name="cpf" onChange={handleChange} required />
        <input type="password" placeholder="Senha" name="senha" onChange={handleChange} required />
        <input type="password" placeholder="Confirmar senha" name="confirmar" onChange={handleChange} required />
        <button type="submit" className="auth-button">Cadastrar</button>
      </form>
    </div>
  );
}