// storage.js - gerencia dados do usuário e token no localStorage

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

// Função alternativa para front-end (getCurrentUser)
export const getCurrentUser = () => getUser();

// Verificar se usuário está logado
export const isLoggedIn = () => !!getUser();

// Limpar dados do usuário (logout)
export const logout = () => {
  localStorage.removeItem('user');
  clearToken(); // Limpa token junto com logout
};

// -------------------------
// Token (opcional)
// -------------------------

// Salvar token de autenticação
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Obter token de autenticação
export const getToken = () => localStorage.getItem('token');

// Limpar token
export const clearToken = () => localStorage.removeItem('token');
