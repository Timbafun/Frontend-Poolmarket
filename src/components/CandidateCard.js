import React from "react";

export default function CandidateCard({ candidato, onVotar }) {
  return (
    <div className="card" onClick={() => onVotar(candidato.id)}>
      <img src={candidato.imagem} alt={candidato.nome} />
      <h3>{candidato.nome}</h3>
      <p>{candidato.votos} votos</p>
    </div>
  );
}
