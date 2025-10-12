import React from "react";
import "./CandidateCard.css";

export default function CandidateCard({ name, votes, onVote, disabled }) {
  // define a imagem de cada candidato
  const photo =
    name.toLowerCase() === "lula"
      ? "/images/lula.jpg"
      : "/images/bolsonaro.webp";

  return (
    <div className="candidate-card">
      <img
        src={photo}
        alt={name}
        className="candidate-photo"
      />
      <h3>{name}</h3>
      <p className="vote-count">{votes} votos</p>
      <button onClick={onVote} disabled={disabled}>
        Votar
      </button>
    </div>
  );
}
