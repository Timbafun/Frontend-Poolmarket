import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Signup() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", cpf: "", senha: "", confirmar: "" });
  const navigate = useNavigate();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-poolmarket.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.senha !== form.confirmar) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.nome,
          email: form.email,
          telefone: form.telefone,
          cpf: form.cpf,
          senha: form.senha
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cadastro efetuado com sucesso!");
        navigate("/");
      } else {
        alert(data.message || "Erro ao cadastrar usuário. Tente novamente.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de comunicação ao cadastrar usuário.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome completo" onChange={(e) => setForm({ ...form, nome: e.target.value })} />
        <input type="email" name="email" placeholder="E-mail" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="text" name="telefone" placeholder="Telefone" onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
        <input type="text" name="cpf" placeholder="CPF" onChange={(e) => setForm({ ...form, cpf: e.target.value })} />
        <input type="password" name="senha" placeholder="Senha" onChange={(e) => setForm({ ...form, senha: e.target.value })} />
        <input type="password" name="confirmar" placeholder="Confirmar senha" onChange={(e) => setForm({ ...form, confirmar: e.target.value })} />
        <button type="submit" className="auth-button">Cadastrar</button>
      </form>
    </div>
  );
}