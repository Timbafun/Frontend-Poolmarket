import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Register() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/register", form);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao cadastrar");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Cadastre-se</h2>
        <form onSubmit={handleSubmit}>
          <input name="nome" placeholder="Nome completo" onChange={handleChange} required />
          <input name="email" placeholder="E-mail" onChange={handleChange} required />
          <input name="telefone" placeholder="Telefone" onChange={handleChange} required />
          <input name="cpf" placeholder="CPF" onChange={handleChange} required />
          <input name="senha" placeholder="Senha" type="password" onChange={handleChange} required />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </>
  );
}
