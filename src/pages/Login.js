import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("URL_DO_BACKEND/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (data.success) {
        // salva usuário no localStorage para manter logado
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Logado com sucesso!");
        navigate("/"); // redireciona para home
      } else {
        alert("E-mail ou senha inválidos");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao fazer login");
    }
  };

  return (
    <div className="page auth">
      <form className="form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}
