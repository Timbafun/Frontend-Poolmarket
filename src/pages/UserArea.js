import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function UserArea() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    // Recupera o usuário logado
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      // Se quiser puxar histórico real do backend, faz fetch aqui.
      // Por enquanto, simulação:
      setHistorico([
        { acao: "Votou em Lula", horario: "13:40 - 13/10/2025" },
        { acao: "Votou em Bolsonaro", horario: "14:12 - 13/10/2025" },
      ]);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Você saiu da sua conta.");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>Área do Usuário</h2>
      {user ? (
        <>
          <p><strong>Bem-vindo(a):</strong> {user.email}</p>
          <h3>Histórico de Atividades</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {historico.map((item, index) => (
              <li key={index}>
                <p>{item.acao}</p>
                <small>{item.horario}</small>
              </li>
            ))}
          </ul>
          <button className="auth-button" onClick={handleLogout}>
            Sair
          </button>
        </>
      ) : (
        <p>Carregando informações...</p>
      )}
    </div>
  );
}
