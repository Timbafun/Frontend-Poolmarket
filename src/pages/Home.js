import React, { useEffect, useState } from "react";
import { getVotes, getCurrentUser, castVote, saveCurrentUser } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [votes, setVotes] = useState({ lula: 0, bolsonaro: 0 });
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    setVotes(getVotes());

    // Atualiza o usuário logado em tempo real
    const interval = setInterval(() => {
      const current = getCurrentUser();
      setUser(current);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleVote = (candidate) => {
    const current = getCurrentUser();

    // Se o usuário não estiver logado
    if (!current) {
      alert("Você precisa estar logado para votar.");
      navigate("/login");
      return;
    }

    // Verifica se o usuário já votou
    if (current.hasVoted) {
      alert("Você já votou. Cada usuário só pode votar uma vez.");
      return;
    }

    // Registra o voto
    const result = castVote(candidate, current.email || current.cpf);

    if (!result.ok) {
      alert(result.message);
      return;
    }

    // Marca o usuário como já votante
    const updatedUser = { ...current, hasVoted: true, votedFor: candidate, votedAt: new Date().toISOString() };
    saveCurrentUser(updatedUser);

    setVotes(getVotes());
    setUser(updatedUser);

    alert("✅ Voto contabilizado com sucesso!");
  };

  return (
    <div className="page home">
      <h2 className="page-title">Candidatos</h2>
      <div className="candidates-row">
        <div className="candidate">
          <img
            src="/images/lula.jpg"
            alt="Lula"
            className="candidate-photo"
          />
          <h3>Lula</h3>
          <p>{votes.lula || 0} votos</p>
          <button
            className="vote-button"
            onClick={() => handleVote("lula")}
            disabled={user && user.hasVoted}
          >
            {user && user.hasVoted && user.votedFor === "lula" ? "Você votou" : "Votar"}
          </button>
        </div>

        <div className="candidate">
          <img
            src="/images/bolsonaro.webp"
            alt="Bolsonaro"
            className="candidate-photo"
            onError={(e) => (e.target.src = "/images/bolsonaro_fallback.jpg")}
          />
          <h3>Bolsonaro</h3>
          <p>{votes.bolsonaro || 0} votos</p>
          <button
            className="vote-button"
            onClick={() => handleVote("bolsonaro")}
            disabled={user && user.hasVoted}
          >
            {user && user.hasVoted && user.votedFor === "bolsonaro" ? "Você votou" : "Votar"}
          </button>
        </div>
      </div>
    </div>
  );
}
