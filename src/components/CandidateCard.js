import React from "react";
import "./CandidateCard.css";

export default function CandidateCard({ name, imgSrc, votes, onVote, disabled }) {
  return (
    <div className="candidate-card">
      <h3 className="candidate-name">{name}</h3>

      {/* Imagem do candidato */}
      <img
        src={imgSrc}
        alt={name}
        className="candidate-image"
      />

      {/* Contador de votos */}
      <p className="votes-count">Votos: {votes}</p>

      {/* Botão de voto */}
      <button
        className="vote-button"
        onClick={onVote}
        disabled={disabled}
      >
        {disabled ? "Voto registrado" : "Votar"}
      </button>
    </div>
  );
}
