import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [form, setForm] = useState({
    nome: "", email: "", telefone: "", cpf: "", senha: "", confirmSenha: ""
  });
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.senha !== form.confirmSenha) {
      alert("Senhas não conferem");
      return;
    }
    const res = await registerUser({
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
      cpf: form.cpf,
      senha: form.senha,
      confirmSenha: form.confirmSenha,
    });
    if (res.user) {
      alert("Cadastro realizado");
      nav("/login");
    } else {
      alert(res.error || "Erro ao cadastrar");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="center">Cadastro</h2>
      <input placeholder="Nome completo" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
      <input placeholder="Telefone" value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} />
      <input placeholder="CPF" value={form.cpf} onChange={e => setForm({ ...form, cpf: e.target.value })} required />
      <input type="password" placeholder="Senha" value={form.senha} onChange={e => setForm({ ...form, senha: e.target.value })} required />
      <input type="password" placeholder="Confirmar senha" value={form.confirmSenha} onChange={e => setForm({ ...form, confirmSenha: e.target.value })} required />
      <button type="submit">Cadastrar</button>
    </form>
  );
}
