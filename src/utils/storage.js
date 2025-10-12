// storage.js - utilitário para gerenciar dados do usuário no localStorage

// Salvar dados do usuário
export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Obter dados do usuário
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Limpar dados do usuário (logout)
export const logout = () => {
  localStorage.removeItem('user');
};

// Verificar se usuário está logado
export const isLoggedIn = () => {
  return !!getUser();
};

// Salvar token de autenticação (opcional, se você usar token)
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Obter token de autenticação
export const getToken = () => {
  return localStorage.getItem('token');
};

// Limpar token junto com logout
export const clearToken = () => {
  localStorage.removeItem('token');
};
