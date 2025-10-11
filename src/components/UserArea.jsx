import React, { useEffect, useState } from "react";
import { getUserById, getCandidates } from "../api";

export default function UserArea({ user }) {
  const [data, setData] = useState(null);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    if (!user) return;
    getUserById(user.id).then(d => setData(d));
    getCandidates().then(setCandidates);
  }, [user]);

  if (!user) return <p className="center">Faça login para acessar sua área.</p>;

  return (
    <div className="container">
      <h2>Área do Usuário</h2>
      {data && (
        <div>
          <p><strong>Nome:</strong> {data.nome}</p>
          <p><strong>CPF:</strong> {data.cpf}</p>
          <p><strong>Votou em:</strong> {data.voted_candidate_name || "Ainda não votou"}</p>
        </div>
      )}

      <hr />
      <h3>Resumo de candidatos</h3>
      <div className="candidates">
        {candidates.map(c => (
          <div key={c.id} className="card">
            <img src={c.foto_url} alt={c.nome} />
            <h3>{c.nome}</h3>
            <p>Votos: {c.votes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
