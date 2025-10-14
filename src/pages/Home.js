import React, { useEffect, useState } from "react";
// ✅ CORREÇÃO 1: Removemos as funções de storage local e importamos o AuthContext
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
    const [votes, setVotes] = useState({ lula: 0, bolsonaro: 0 });
    const navigate = useNavigate();
    // ✅ CORREÇÃO 2: Usamos o useAuth para obter o estado do usuário (logado, token, hasVoted)
    const { user, isAuthenticated, login } = useAuth(); 

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-poolmarket.onrender.com";

    // Função para carregar os votos iniciais do backend (opcional, mas necessário)
    const fetchVotes = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/votes`);
            const data = await res.json();
            if (res.ok) {
                setVotes(data.votes);
            }
        } catch (error) {
            console.error("Erro ao carregar votos:", error);
        }
    };

    useEffect(() => {
        fetchVotes();
    }, []);

    // ✅ CORREÇÃO 3: Nova lógica handleVote que se comunica com o Backend
    const handleVote = async (candidate) => {
        
        // 1. Verifica se o usuário está logado usando o contexto
        if (!isAuthenticated) {
            alert("Você precisa estar logado para votar.");
            navigate("/login");
            return;
        }

        // 2. Verifica se o usuário JÁ votou (usando os dados que vieram do login)
        if (user && user.hasVoted) {
            alert("Você já votou. Cada usuário só pode votar uma vez.");
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // ✅ CORREÇÃO CRÍTICA: ENVIA O TOKEN para o backend autenticar
                    'Authorization': `Bearer ${user.token}`, 
                },
                body: JSON.stringify({ candidate, userId: user.id }),
            });

            const data = await response.json();

            if (response.ok && data.ok) {
                // 3. Atualiza o estado do usuário no contexto para marcar como votado
                const updatedUser = { 
                    ...user, 
                    hasVoted: true, 
                    votedFor: candidate, 
                    votedAt: new Date().toISOString() 
                };
                login(updatedUser); // Usa a função login para salvar no localStorage
                
                // 4. Atualiza a contagem de votos
                fetchVotes(); 
                alert("✅ Voto contabilizado com sucesso!");

            } else {
                alert(data.message || "❌ Erro ao registrar o voto.");
            }
        } catch (error) {
            console.error("🔥 Erro ao votar:", error);
            alert("Erro de comunicação com o servidor ao tentar votar.");
        }
    };

    // A renderização do layout (HTML/JSX) permanece 100% igual ao seu original
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
                        // Desabilita se não estiver autenticado OU já votou
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
                         // Desabilita se não estiver autenticado OU já votou
                        disabled={!isAuthenticated || (user && user.hasVoted)} 
                    >
                        {user && user.votedFor === "bolsonaro" ? "Você votou" : "Votar"}
                    </button>
                </div>
            </div>
        </div>
    );
}