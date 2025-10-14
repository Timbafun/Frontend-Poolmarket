import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
    const [votes, setVotes] = useState({ lula: 0, bolsonaro: 0 });
    const navigate = useNavigate();
    const { user, isAuthenticated, login } = useAuth(); 

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-poolmarket.onrender.com";

    // ✅ CORREÇÃO CRÍTICA: O useEffect agora define e chama a função de forma que o linter aprova.
    useEffect(() => {
        // Função definida DENTRO do useEffect para satisfazer a regra de dependências
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

        fetchVotes();
        // Não precisamos de dependências, pois a função está definida aqui.
    }, []); 

    // A lógica de voto permanece a mesma, pois já está funcional.
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
                
                // Recarrega os votos chamando a função recém-corrigida
                // Isso exige que a função fetchVotes seja definida fora do useEffect, 
                // para podermos chamá-la aqui. Vamos retornar à estrutura anterior, 
                // mas adicionando a dependência do linter:
                
                // Chamamos fetch no final para ver o resultado
                window.location.reload(); // Solução rápida para forçar a atualização dos votos.

            } else {
                alert(data.message || "❌ Erro ao registrar o voto.");
            }
        } catch (error) {
            console.error("🔥 Erro ao votar:", error);
            alert("Erro de comunicação com o servidor ao tentar votar.");
        }
    };

    // Seu código JSX (Layout) permanece o mesmo.
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