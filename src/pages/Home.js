import React, { useEffect, useState } from "react";
import CandidateCard from "../components/CandidateCard";
import { getVotes, getCurrentUser, castVote } from "../utils/storage";
import { useNavigate } from "react-router-dom";

import Lula from '../assets/lula.jpg';
import Bolsonaro from '../assets/bolsonaro.jpg';

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
        <CandidateCard
          name="Lula"
          imgSrc={LulaImg}
          votes={votes.lula || 0}
          onVote={() => handleVote("lula")}
          disabled={user && user.hasVoted}
        />
        <CandidateCard
          name="Bolsonaro"
          imgSrc={BolsonaroImg}
          votes={votes.bolsonaro || 0}
          onVote={() => handleVote("bolsonaro")}
          disabled={user && user.hasVoted}
        />
      </div>
    </div>
  );
}
