import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://seu-backend.onrender.com/api/login", {
        email,
        senha,
      });

      if (response.status === 200) {
        setMensagem("Login realizado com sucesso!");
        localStorage.setItem("usuario", JSON.stringify(response.data));
        window.location.href = "/";
      }
    } catch (error) {
      setMensagem("E-mail ou senha incorretos. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <h2>Entrar</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">E-mail cadastrado:</label>
        <input
          type="email"
          id="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
};

export default Login;
