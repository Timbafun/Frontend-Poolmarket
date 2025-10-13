import React, { useState } from "react";
import "./SignupForm.css";

function SignupForm() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    confirmaSenha: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.senha !== form.confirmaSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    alert("Cadastro realizado!");
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <input name="nome" placeholder="Nome completo" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="telefone" placeholder="Telefone" onChange={handleChange} />
      <input name="cpf" placeholder="CPF" onChange={handleChange} />
      <input name="senha" type="password" placeholder="Senha" onChange={handleChange} />
      <input name="confirmaSenha" type="password" placeholder="Confirmar senha" onChange={handleChange} />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default SignupForm;
