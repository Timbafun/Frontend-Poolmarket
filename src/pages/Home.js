import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext"; // Importa o contexto de autenticação
import { useNavigate } from "react-router-dom";
import "./Home.css";

// URL do seu Backend (Importado do .env do Netlify)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-poolmarket.onrender.com";

export default function Home() {
    const [votes, setVotes] = useState({ lula: 0, bolsonaro: 0 });
    const navigate = useNavigate();
    // CRÍTICO: Usa o useAuth para pegar o status logado, usuário e a função login (para atualizar o estado de voto)
    const { user, isAuthenticated, login } = useAuth(); 

    // ✅ CORREÇÃO LINTER: Função para buscar votos do Backend
    const fetchVotes = useCallback(async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/votes`);
            const data = await res.json();
            if (res.ok) {
                setVotes(data.votes);
            }
        } catch (error) {
            console.error("Erro ao carregar votos:", error);
        }
    }, []); // Lista de dependências vazia para o linter

    // 1. Carrega os votos na inicialização
    useEffect(() => {
        fetchVotes(); 
    }, [fetchVotes]); // Dependência: fetchVotes (que é estável graças ao useCallback)


    // 2. Lógica de Voto REAL (Envia requisição para o Backend)
    const handleVote = async (candidate) => {
        
        // 🔑 VERIFICAÇÃO FINAL: Garante que o usuário esteja logado E que tenha o Token JWT
        if (!isAuthenticated || !user || !user.token) {
            alert("Você precisa estar logado para votar.");
            navigate("/login");
            return;
        }

        // Verifica se o usuário já votou (usando o estado do Frontend)
        if (user && user.hasVoted) {
            alert("Você já votou. Cada usuário só pode votar uma vez.");
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // CRÍTICO: Envia o Token JWT que o Backend precisa para autenticar
                    'Authorization': `Bearer ${user.token}`, 
                },
                body: JSON.stringify({ candidate, userId: user.id }),
            });

            const data = await response.json();

            if (response.ok && data.ok) {
                // Atualiza o usuário no Context e localStorage com o novo status (hasVoted: true)
                login(data.user); 
                
                fetchVotes(); // Recarrega os votos

                alert("✅ Voto contabilizado com sucesso!");

            } else {
                alert(data.message || "❌ Erro ao registrar o voto.");
            }
        } catch (error) {
            console.error("🔥 Erro ao votar:", error);
            alert("Erro de comunicação com o servidor ao tentar votar.");
        }
    };

    // --- Layout (Nenhuma alteração de estrutura) ---
    return (
        <div className="page home">
            <h2 className="page-title">Candidatos</h2>
            <div className="candidates-row">
                <div className="candidate">
                    <img
                        src="/images/lula.jpg"
                        alt="Lula"
                        className="candidate-photo"
                    />
                    <h3>Lula</h3>
                    <p>{votes.lula || 0} votos</p>
                    <button
                        className="vote-button"
                        onClick={() => handleVote("lula")}
                        // Desabilita se não estiver autenticado OU se já tiver votado
                        disabled={!isAuthenticated || (user && user.hasVoted)} 
                    >
                        {user && user.votedFor === "lula" ? "Você votou" : "Votar"}
                    </button>
                </div>

                <div className="candidate">
                    <img
                        src="/images/bolsonaro.webp"
                        alt="Bolsonaro"
                        className="candidate-photo"
                        onError={(e) => (e.target.src = "/images/bolsonaro_fallback.jpg")}
                    />
                    <h3>Bolsonaro</h3>
                    <p>{votes.bolsonaro || 0} votos</p>
                    <button
                        className="vote-button"
                        onClick={() => handleVote("bolsonaro")}
                        disabled={!isAuthenticated || (user && user.hasVoted)} 
                    >
                        {user && user.votedFor === "bolsonaro" ? "Você votou" : "Votar"}
                    </button>
                </div>
            </div>
        </div>
    );
}