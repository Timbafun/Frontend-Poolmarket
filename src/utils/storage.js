// src/utils/storage.js
const API_URL = process.env.REACT_APP_API_URL || "https://backend-poolmarket.onrender.com";

// -----------------------------
// Funções de Cadastro e Login
// -----------------------------

// Registrar novo usuário
export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Erro no cadastro.");

    // Salva o usuário logado localmente
    localStorage.setItem("currentUser", JSON.stringify(data.user));
    return { ok: true, user: data.user };

  } catch (error) {
    return { ok: false, message: error.message };
  }
}

// Fazer login
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Erro no login.");

    // Salva o usuário logado localmente
    localStorage.setItem("currentUser", JSON.stringify(data.user));
    return { ok: true, user: data.user };

  } catch (error) {
    return { ok: false, message: error.message };
  }
}

// Obter usuário atual
export function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

// Fazer logout
export function logoutUser() {
  localStorage.removeItem("currentUser");
}

// -----------------------------
// Funções de Votação
// -----------------------------

// Enviar voto para o backend
export async function castVote(candidate, cpf) {
  try {
    const response = await fetch(`${API_URL}/votes/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidate, cpf }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Erro ao votar.");

    // Atualiza usuário localmente com flag de voto
    const user = getCurrentUser();
    if (user) {
      user.hasVoted = true;
      localStorage.setItem("currentUser", JSON.stringify(user));
    }

    return { ok: true, message: "Voto computado com sucesso!" };

  } catch (error) {
    return { ok: false, message: error.message };
  }
}

// Buscar total de votos
export async function getVotes() {
  try {
    const response = await fetch(`${API_URL}/votes/count`);
    const data = await response.json();
    return data.votes || { lula: 0, bolsonaro: 0 };
  } catch {
    return { lula: 0, bolsonaro: 0 };
  }
}
