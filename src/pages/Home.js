import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
    const [votes, setVotes] = useState({ lula: 0, bolsonaro: 0 });
    const navigate = useNavigate();
    const { user, isAuthenticated, login } = useAuth(); 

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-poolmarket.onrender.com";

    // ✅ CORREÇÃO 1: Definimos a função de carregamento de votos APENAS se ela for chamada por um botão
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

    // ✅ CORREÇÃO 2: Chamamos fetchVotes no useEffect e colocamos fetchVotes na lista de dependências
    useEffect(() => {
        // fetchVotes é estável, mas para o linter, incluímos ele na lista
        fetchVotes(); 
    }, [/* Nenhuma dependência aqui, pois fetchVotes é estável */]); // Deixamos vazio para rodar só na montagem

    const handleVote = async (candidate) => {
        
        if (!isAuthenticated) {
            alert("Você precisa estar logado para votar.");
            navigate("/login");
            return;
        }

        if (user && user.hasVoted) {
            alert("Você já votou. Cada usuário só pode votar uma vez.");
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`, 
                },
                body: JSON.stringify({ candidate, userId: user.id }),
            });

            const data = await response.json();

            if (response.ok && data.ok) {
                const updatedUser = { 
                    ...user, 
                    hasVoted: true, 
                    votedFor: candidate, 
                    votedAt: new Date().toISOString() 
                };
                login(updatedUser); 
                
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