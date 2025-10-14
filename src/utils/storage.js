// src/utils/storage.js

// Funções utilitárias para gerenciar dados no localStorage

// Salvar usuário no localStorage
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Obter usuário do localStorage
export const getUser = () => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

// Remover usuário do localStorage
export const removeUser = () => {
  localStorage.removeItem("user");
};

// ------------------------------
// Funções de votos (mock local)
// ------------------------------

// Recupera votos armazenados
export const getVotes = () => {
  const data = localStorage.getItem("votes");
  return data ? JSON.parse(data) : { lula: 0, bolsonaro: 0 };
};

// Salva votos
export const saveVotes = (votes) => {
  localStorage.setItem("votes", JSON.stringify(votes));
};

// Registra voto para um candidato
export const addVote = (candidate) => {
  // recupera votos
  const votes = getVotes();

  // verifica se o candidato existe
  if (!(candidate in votes)) {
    return { ok: false, message: "Candidato inválido." };
  }

  // incrementa o voto
  votes[candidate] += 1;

  // salva novamente
  saveVotes(votes);

  return { ok: true, message: "Voto registrado com sucesso!" };
};
