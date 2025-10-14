import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function UserArea() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const userVotes = [];
    if (user.hasVoted) {
      if (user.votedFor === "lula") userVotes.push({ acao: "Votou em Lula", horario: new Date().toLocaleString() });
      if (user.votedFor === "bolsonaro") userVotes.push({ acao: "Votou em Bolsonaro", horario: new Date().toLocaleString() });
    }

    setHistorico(userVotes);
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    alert("Você saiu da sua conta.");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>Área do Usuário</h2>
      {user && (
        <>
          <p><strong>Bem-vindo(a):</strong> {user.email}</p>
          <h3>Histórico de Atividades</h3>
          {historico.length === 0 ? (
            <p>Nenhuma atividade registrada.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {historico.map((item, idx) => (
                <li key={idx}>
                  <p>{item.acao}</p>
                  <small>{item.horario}</small>
                </li>
              ))}
            </ul>
          )}
          <button className="auth-button" onClick={handleLogout}>Sair</button>
        </>
      )}
    </div>
  );
}
