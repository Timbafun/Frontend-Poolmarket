import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/storage";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = loginUser(form.email, form.senha);
    if (res.ok) {
      alert("Login realizado com sucesso!");
      window.dispatchEvent(new Event("storage")); // força atualização do Header
      navigate("/user-area"); // redireciona para área do usuário
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
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
