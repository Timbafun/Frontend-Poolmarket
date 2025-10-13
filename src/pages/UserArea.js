import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/storage";
import "./Auth.css";

export default function UserArea() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login"); // se não estiver logado, redireciona para login
      return;
    }
    setUser(currentUser);

    // Exemplo de histórico de votação (pode ser puxado do storage real)
    const votos = JSON.parse(localStorage.getItem("pm_votes")) || {};
    const userVotes = [];

    if (currentUser.hasVoted) {
      // apenas exemplo simples, você pode expandir para registrar horário real
      if (votos.lula > 0) userVotes.push({ acao: "Votou em Lula", horario: new Date().toLocaleString() });
      if (votos.bolsonaro > 0) userVotes.push({ acao: "Votou em Bolsonaro", horario: new Date().toLocaleString() });
    }

    setHistorico(userVotes);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    alert("Você saiu da sua conta.");
    navigate("/");
    window.dispatchEvent(new Event("storage")); // atualiza o Header
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
              {historico.map((item, index) => (
                <li key={index}>
                  <p>{item.acao}</p>
                  <small>{item.horario}</small>
                </li>
              ))}
            </ul>
          )}
          <button className="auth-button" onClick={handleLogout}>
            Sair
          </button>
        </>
      )}
    </div>
  );
}
