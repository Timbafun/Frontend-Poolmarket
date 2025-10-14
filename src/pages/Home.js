import React, { useEffect, useState, useCallback } from "react"; 
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// URL definida fora do componente, tornando-a estável
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-poolmarket.onrender.com";

export default function Home() {
    const [votes, setVotes] = useState({ lula: 0, bolsonaro: 0 });
    const navigate = useNavigate();
    const { user, isAuthenticated, login } = useAuth(); 

    // ✅ CORREÇÃO FINAL: Removemos a BACKEND_URL das dependências do useCallback
    const fetchVotes = useCallback(async () => {
        try {
            // Usa BACKEND_URL que é global
            const res = await fetch(`${BACKEND_URL}/api/votes`);
            const data = await res.json();
            if (res.ok) {
                setVotes(data.votes);
            }
        } catch (error) {
            console.error("Erro ao carregar votos:", error);
        }
    }, []); // <--- Lista de dependências AGORA ESTÁ VAZIA!

    // O useEffect chama fetchVotes e precisa dele na dependência
    useEffect(() => {
        fetchVotes(); 
    }, [fetchVotes]); // fetchVotes é uma dependência estável


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

    // O restante do seu JSX (Layout) permanece o mesmo.
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