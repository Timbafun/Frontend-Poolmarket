import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (senha !== confirmaSenha) {
      alert("Senhas não conferem");
      return;
    }

    try {
      const res = await fetch("URL_DO_BACKEND/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone, senha }),
      });

      const data = await res.json();

      if (data.success) {
        // salva usuário no localStorage para manter logado
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Cadastro realizado e logado com sucesso!");
        navigate("/"); // redireciona para home
      } else {
        alert("Erro ao cadastrar: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar");
    }
  };

  return (
    <div className="page auth">
      <form className="form" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirme a senha"
          value={confirmaSenha}
          onChange={(e) => setConfirmaSenha(e.target.value)}
          required
        />
        <button type="submit" className="btn">Cadastrar</button>
      </form>
    </div>
  );
}
