import React, { useState } from "react";
import { registerUser } from "../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    confirmSenha: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.senha !== form.confirmSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    setLoading(true);
    const res = await registerUser(form);
    setLoading(false);

    if (!res.ok) {
      alert(res.message || "Erro ao cadastrar.");
    } else {
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    }
  };

  return (
    <div className="page signup">
      <h2>Cadastro</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome completo" onChange={handleChange} required />
        <input name="email" type="email" placeholder="E-mail" onChange={handleChange} required />
        <input name="telefone" placeholder="Telefone" onChange={handleChange} required />
        <input name="cpf" placeholder="CPF" onChange={handleChange} required />
        <input name="senha" type="password" placeholder="Senha" onChange={handleChange} required />
        <input name="confirmSenha" type="password" placeholder="Confirmar senha" onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
