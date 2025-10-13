import React from "react";
import { getCurrentUser } from "../utils/storage";

export default function UserArea() {
  const user = getCurrentUser();

  if (!user) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Você precisa estar logado para acessar esta área.</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Área do Usuário</h2>
      <p><strong>Nome:</strong> {user.nome}</p>
      <p><strong>CPF:</strong> {user.cpf}</p>
      <p><strong>Histórico:</strong> Você votou em {user.votedFor || "nenhum candidato ainda"}.</p>
    </div>
  );
}
