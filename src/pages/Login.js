import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/storage";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({ cpf: "", senha: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = loginUser(form.cpf, form.senha);
    if (success) {
      alert("Login realizado com sucesso!");
      navigate("/"); // redireciona logado
    } else {
      alert("CPF ou senha inválidos.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="CPF"
          value={form.cpf}
          onChange={(e) => setForm({ ...form, cpf: e.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={(e) => setForm({ ...form, senha: e.target.value })}
        />
        <button type="submit" className="auth-button">Entrar</button>
      </form>
    </div>
  );
}
