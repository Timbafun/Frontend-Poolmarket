import React, { useState } from "react";
import { loginUser } from "../utils/storage";
import { useNavigate } from "react-router-dom";

// ✅ Importando o CSS que criamos para estilizar Login
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const res = loginUser(email.trim(), senha);
    if (!res.ok) {
      alert(res.message);
      return;
    }
    alert("Login realizado!");
    navigate("/");
  };

  return (
    <div className="page auth">
      <h2>Login</h2>
      <form className="form" onSubmit={submit}>
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button className="btn" type="submit">Entrar</button>
      </form>
    </div>
  );
}
