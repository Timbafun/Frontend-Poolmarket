import React, { useEffect, useState } from "react";
import CandidateCard from "../components/CandidateCard";
import { getVotes, getCurrentUser, castVote } from "../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [votes, setVotes] = useState({ lula: 0, bolsonaro: 0 });
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    async function loadVotes() {
      const v = await getVotes();
      setVotes(v);
    }
    loadVotes();

    // Atualiza se houver mudança de login
    const interval = setInterval(() => setUser(getCurrentUser()), 500);
    return () => clearInterval(interval);
  }, []);

  const handleVote = async (candidate) => {
    const current = getCurrentUser();
    if (!current) {
      if (window.confirm("Você precisa estar logado para votar. Ir para Login?")) {
        navigate("/login");
      }
      return;
    }

    const res = await castVote(candidate, current.cpf);
    if (!res.ok) {
      alert(res.message);
    } else {
      alert("Voto contabilizado com sucesso!");
      const v = await getVotes();
      setVotes(v);
    }
  };

  return (
    <div className="page home">
      <h2 className="page-title">Candidatos</h2>
      <div className="candidates-row">
        <CandidateCard
          name="Lula"
          imgSrc="/images/lula.jpg"
          votes={votes.lula || 0}
          onVote={() => handleVote("lula")}
          disabled={user && user.hasVoted}
        />
        <CandidateCard
          name="Bolsonaro"
          imgSrc="/images/bolsonaro.webp"
          votes={votes.bolsonaro || 0}
          onVote={() => handleVote("bolsonaro")}
          disabled={user && user.hasVoted}
        />
      </div>
    </div>
  );
}
