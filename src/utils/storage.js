// storage.js - gerencia usuário, votos e token no localStorage

// -------------------------
// Usuário
// -------------------------

// Salvar usuário no localStorage
export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Obter usuário
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Retorna usuário atual
export const getCurrentUser = () => getUser();

// Registro de usuário: impede CPF duplicado
export const registerUser = (user) => {
  const existingUser = getUser();
  if (existingUser && existingUser.cpf === user.cpf) {
    throw new Error('CPF já cadastrado');
  }
  saveUser(user);
  return user;
};

// Login simulado
export const loginUser = (cpf, password) => {
  const user = getUser();
  if (user && user.cpf === cpf && user.password === password) {
    return user;
  }
  return null;
};

// Logout: remove usuário e token
export const logout = () => {
  localStorage.removeItem('user');
  clearToken();
};

// Verifica se usuário está logado
export const isLoggedIn = () => !!getUser();

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
