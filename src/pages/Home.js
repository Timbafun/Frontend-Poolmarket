import React, { useEffect, useState } from "react";
import CandidateCard from "../components/CandidateCard";
import { getVotes, getCurrentUser, castVote } from "../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [votes, setVotes] = useState({ lula: 0, bolsonaro: 0 });
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    setVotes(getVotes());
    // atualiza se houver mudança de login
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

  const userCanVote = !user || (user && !user.hasVoted) ? false : true; // we will pass disabled per-card

  return (
    <div className="page home">
      <h2 className="page-title">Candidatos</h2>
      <div className="candidates-row">
        <CandidateCard
          name="Lula"
          votes={votes.lula || 0}
          onVote={() => handleVote("lula")}
          disabled={user && user.hasVoted}
        />
        <CandidateCard
          name="Bolsonaro"
          votes={votes.bolsonaro || 0}
          onVote={() => handleVote("bolsonaro")}
          disabled={user && user.hasVoted}
        />
      </div>
    </div>
  );
}
