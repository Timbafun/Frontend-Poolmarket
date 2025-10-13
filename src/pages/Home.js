import React, { useEffect, useState } from "react";
import CandidateCard from "../components/CandidateCard";
import { getVotes, getCurrentUser, castVote } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [votes, setVotes] = useState({ lula: 0, bolsonaro: 0 });
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    setVotes(getVotes());
    const t = setInterval(() => setUser(getCurrentUser()), 500);
    return () => clearInterval(t);
  }, []);

  const handleVote = (candidate) => {
    const current = getCurrentUser();
    if (!current) {
      if (!window.confirm("Você precisa estar logado para votar. Ir para Login?")) return;
      navigate("/login");
      return;
    }

    const res = castVote(candidate, current.cpf);
    if (!res.ok) {
      alert(res.message);
    } else {
      setVotes(getVotes());
      alert("Voto contabilizado!");
    }
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
            Votar
          </button>
        </div>

        <div className="candidate">
          <img
            src="/images/bolsonaro.jpg"
            alt="Bolsonaro"
            className="candidate-photo"
          />
          <h3>Bolsonaro</h3>
          <p>{votes.bolsonaro || 0} votos</p>
          <button
            className="vote-button"
            onClick={() => handleVote("bolsonaro")}
            disabled={user && user.hasVoted}
          >
            Votar
          </button>
        </div>
      </div>
    </div>
  );
}
