import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/storage";
import "./Auth.css";

export default function Signup() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", cpf: "", senha: "", confirmar: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = registerUser(form);
    if (res.ok) {
      alert("Cadastro efetuado com sucesso!");
      navigate("/"); // redireciona logado
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome completo" onChange={(e) => setForm({ ...form, nome: e.target.value })} />
        <input type="email" placeholder="E-mail" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="text" placeholder="Telefone" onChange={(e) => setForm({ ...form, telefone: e.target.value })} />
        <input type="text" placeholder="CPF" onChange={(e) => setForm({ ...form, cpf: e.target.value })} />
        <input type="password" placeholder="Senha" onChange={(e) => setForm({ ...form, senha: e.target.value })} />
        <input type="password" placeholder="Confirmar senha" onChange={(e) => setForm({ ...form, confirmar: e.target.value })} />
        <button type="submit" className="auth-button">Cadastrar</button>
      </form>
    </div>
  );
}
