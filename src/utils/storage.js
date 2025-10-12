// storage.js - gerencia dados do usuário, votos e token no localStorage

// -------------------------
// Usuário
// -------------------------
export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getCurrentUser = () => getUser();

export const isLoggedIn = () => !!getUser();

export const logout = () => {
  localStorage.removeItem('user');
  clearToken();
};

// -------------------------
// Token (opcional)
// -------------------------
export const saveToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const clearToken = () => localStorage.removeItem('token');

// -------------------------
// Votos
// -------------------------

// Salvar votos completos
export const saveVotes = (votes) => {
  localStorage.setItem('votes', JSON.stringify(votes));
};

// Obter votos completos
export const getVotes = () => {
  const votes = localStorage.getItem('votes');
  return votes ? JSON.parse(votes) : { lula: 0, bolsonaro: 0 };
};

// Adicionar voto a um candidato
export const castVote = (candidate) => {
  const votes = getVotes();
  if (candidate === 'lula' || candidate === 'bolsonaro') {
    votes[candidate] = (votes[candidate] || 0) + 1;
    saveVotes(votes);
  } else {
    console.error('Candidato inválido:', candidate);
  }
};
