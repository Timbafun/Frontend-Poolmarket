// storage.js - gerencia dados do usuário e votos no localStorage

// -------------------------
// Usuário
// -------------------------

// Salvar dados do usuário
export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Obter dados do usuário
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Função alternativa para front-end
export const getCurrentUser = () => getUser();

// Verificar se usuário está logado
export const isLoggedIn = () => !!getUser();

// Logout: remove usuário e token
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

// Salvar votos
export const saveVotes = (votes) => {
  localStorage.setItem('votes', JSON.stringify(votes));
};

// Obter votos
export const getVotes = () => {
  const votes = localStorage.getItem('votes');
  return votes ? JSON.parse(votes) : { lula: 0, bolsonaro: 0 };
};
