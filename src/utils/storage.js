// key names
const USERS_KEY = "pm_users";
const VOTES_KEY = "pm_votes";
const CURRENT_KEY = "pm_currentUser";

// inicializa storage se necessário
function ensureInit() {
  if (!localStorage.getItem(USERS_KEY)) localStorage.setItem(USERS_KEY, JSON.stringify([]));
  if (!localStorage.getItem(VOTES_KEY)) {
    // inicializa com os dois candidatos
    const initial = { lula: 0, bolsonaro: 0 };
    localStorage.setItem(VOTES_KEY, JSON.stringify(initial));
  }
}

export function getUsers() {
  ensureInit();
  return JSON.parse(localStorage.getItem(USERS_KEY));
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getVotes() {
  ensureInit();
  return JSON.parse(localStorage.getItem(VOTES_KEY));
}

export function saveVotes(votes) {
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
}

export function registerUser(user) {
  // user: { nome, email, telefone, cpf, senha }
  ensureInit();
  const users = getUsers();

  const cpfClean = cleanCPF(user.cpf);

  // verifica duplicidade de CPF ou email
  if (users.some((u) => cleanCPF(u.cpf) === cpfClean)) {
    return { ok: false, message: "CPF já cadastrado." };
  }
  if (users.some((u) => u.email === user.email)) {
    return { ok: false, message: "E-mail já cadastrado." };
  }

  // cria novo usuário
  const newUser = { ...user, cpf: cpfClean, hasVoted: false };
  users.push(newUser);
  saveUsers(users);

  // 🔹 novo: deixa o usuário automaticamente logado após o cadastro
  localStorage.setItem(CURRENT_KEY, JSON.stringify(newUser));

  return { ok: true, user: newUser };
}

export function loginUser(email, senha) {
  ensureInit();
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.senha === senha);
  if (!user) return { ok: false, message: "Credenciais inválidas." };

  // 🔹 salva usuário logado
  localStorage.setItem(CURRENT_KEY, JSON.stringify(user));

  return { ok: true, user };
}

export function logout() {
  localStorage.removeItem(CURRENT_KEY);
}

export function getCurrentUser() {
  const s = localStorage.getItem(CURRENT_KEY);
  return s ? JSON.parse(s) : null;
}

export function updateCurrentUser(user) {
  // atualiza usuário no CURRENT_KEY e na lista de users
  localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  const users = getUsers();
  const idx = users.findIndex((u) => cleanCPF(u.cpf) === cleanCPF(user.cpf));
  if (idx !== -1) {
    users[idx] = user;
    saveUsers(users);
  }
}

// 🔹 novo: função auxiliar para salvar usuário logado (usada no Home.js)
export function saveCurrentUser(user) {
  localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
}

export function castVote(candidate, cpf) {
  // retorna { ok, message }
  ensureInit();
  const users = getUsers();
  const cpfClean = cleanCPF(cpf);
  const userIdx = users.findIndex((u) => cleanCPF(u.cpf) === cpfClean);
  if (userIdx === -1) return { ok: false, message: "Usuário não encontrado." };

  const user = users[userIdx];
  if (user.hasVoted) return { ok: false, message: "CPF já votou." };

  // registra voto
  const votes = getVotes();
  if (!(candidate in votes)) return { ok: false, message: "Candidato inv
