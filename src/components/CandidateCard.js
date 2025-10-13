import React from "react";
import "./CandidateCard.css";

export default function CandidateCard({ name, votes, onVote, disabled, image }) {
  return (
    <div className="candidate-card">
      <img src={image} alt={name} className="candidate-photo" />
      <h3 className="candidate-name">{name}</h3>
      <p className="candidate-votes">{votes} votos</p>
      <button
        className="vote-button"
        onClick={onVote}
        disabled={disabled}
      >
        Votar
      </button>
    </div>
  );
}
