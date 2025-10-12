import React, { useState } from "react";
import { registerUser } from "../utils/storage";
import { useNavigate } from "react-router-dom";

// ✅ Importando o CSS correto
import './Cadastro.css';

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (senha !== confirmSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    const res = registerUser({ nome, email, telefone, cpf, senha });
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
        <input
          placeholder="Nome completo"
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Telefone"
          type="tel"
          value={telefone}
          onChange={e => setTelefone(e.target.value)}
          required
        />
        <input
          placeholder="CPF"
          type="text"
          value={cpf}
          onChange={e => setCpf(e.target.value)}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <input
          placeholder="Confirmar senha"
          type="password"
          value={confirmSenha}
          onChange={e => setConfirmSenha(e.target.value)}
          required
        />
        <button className="btn" type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
