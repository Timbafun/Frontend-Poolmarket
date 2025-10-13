import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout, getVotes } from "../utils/storage";
import "./Auth.css";

export default function UserArea() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);

    // Histórico de votos
    const votes = getVotes();
    const userVotes = [];
    if (currentUser.hasVoted) {
      if (votes.lula > 0) userVotes.push({ acao: "Votou em Lula", horario: new Date().toLocaleString() });
      if (votes.bolsonaro > 0) userVotes.push({ acao: "Votou em Bolsonaro", horario: new Date().toLocaleString() });
    }
    setHistorico(userVotes);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    alert("Você saiu da sua conta.");
    window.dispatchEvent(new Event("storage")); // atualiza o Header
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
