import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/storage";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" }); // mudou cpf → email
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = loginUser(form.email, form.senha); // envia email em vez de cpf
    if (success) {
      alert("Login realizado com sucesso!");
      navigate("/"); // redireciona logado
    } else {
      alert("E-mail ou senha inválidos."); // alterei a mensagem
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail" // trocado de CPF para E-mail
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={(e) => setForm({ ...form, senha: e.target.value })}
          required
        />
        <button type="submit" className="auth-button">Entrar</button>
      </form>
    </div>
  );
}
