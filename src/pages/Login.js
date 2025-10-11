import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/login", { cpf, senha });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("cpf", cpf);
      alert("Login realizado com sucesso!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao fazer login");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="CPF" />
          <input
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            type="password"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </>
  );
}
