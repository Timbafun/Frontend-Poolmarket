import React from "react";

export default function CandidateCard({ name, imgSrc, votes, onVote, disabled }) {
  return (
    <div className="card">
      <div className="candidate-image">
        {/* substitua por <img src={imgSrc} /> se tiver imagem real */}
        <div className="placeholder-image">{name}</div>
      </div>
      <h3>{name}</h3>
      <p className="votes">Votos: <strong>{votes}</strong></p>
      <button className="btn" onClick={onVote} disabled={disabled}>
        {disabled ? "Já votou" : "Votar"}
      </button>
    </div>
  );
}
