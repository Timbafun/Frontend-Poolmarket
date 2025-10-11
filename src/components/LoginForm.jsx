import React, { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ onLogin }) {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await loginUser({ cpf, senha });
    if (res.token && res.user) {
      onLogin(res.user);
      nav("/");
    } else {
      alert(res.error || "Erro ao logar");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="center">Login</h2>
      <input placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
      <button type="submit">Entrar</button>
    </form>
  );
}
