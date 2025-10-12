import React, { useState } from "react";
import { registerUser, cleanCPF } from "../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    senha: "",
    confirmaSenha: ""
  });
  const navigate = useNavigate();

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (form.senha !== form.confirmaSenha) {
      alert("As senhas não coincidem.");
      return;
    }
    const res = registerUser({
      nome: form.nome.trim(),
      email: form.email.trim(),
      telefone: form.telefone.trim(),
      cpf: cleanCPF(form.cpf),
      senha: form.senha
    });
    if (!res.ok) {
      alert(res.message);
      return;
    }
    alert("Cadastro realizado com sucesso!");
    navigate("/login");
  };

  return (
    <div className="page auth">
      <h2>Cadastro</h2>
      <form className="form" onSubmit={submit}>
        <input name="nome" placeholder="Nome completo" value={form.nome} onChange={handle} required />
        <input name="email" type="email" placeholder="E-mail" value={form.email} onChange={handle} required />
        <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handle} />
        <input name="cpf" placeholder="CPF (somente números)" value={form.cpf} onChange={handle} required />
        <input name="senha" type="password" placeholder="Senha" value={form.senha} onChange={handle} required />
        <input name="confirmaSenha" type="password" placeholder="Confirmar senha" value={form.confirmaSenha} onChange={handle} required />
        <button className="btn" type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
