import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import PixModal from "../components/PixModal"; 
import "./Home.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-poolmarket.onrender.com";

export default function Home() {
    const [votes, setVotes] = useState({ lula: 0, bolsonaro: 0 });
    const [pixData, setPixData] = useState(null); 
    const navigate = useNavigate();
    
    const { user, isAuthenticated } = useAuth();

    const fetchVotes = useCallback(async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/votes`);
            const data = await res.json();
            if (res.ok) {
                setVotes(data); 
            }
        } catch (error) {
            console.error("Erro ao carregar votos:", error);
        }
    }, []); 

    useEffect(() => {
        fetchVotes(); 
    }, [fetchVotes]); 


    const handleVote = async (candidate) => {
        
        const VOTE_AMOUNT = 1.00; 

        if (!isAuthenticated || !user || !user.token) {
            alert("Você precisa estar logado para votar.");
            navigate("/login");
            return;
        }
        
        if (user.hasVoted) {
            alert("Você já votou. Cada usuário só pode votar uma vez.");
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/generate-pix`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ 
                    candidate, 
                    amount: VOTE_AMOUNT
                }),
            });

            const data = await response.json();

            if (response.ok && data.ok) {
                
                if (data.qrCodeUrl && data.pixCode) {
                    // Ação: Preenche o pixData para abrir o modal
                    setPixData({ 
                        qrCodeUrl: data.qrCodeUrl, 
                        pixCode: data.pixCode, 
                        candidate 
                    });
                } else {
                    // Transação pendente ou já paga, mas sem dados de QR Code (voto concluído).
                    alert(data.message || "Seu voto está aguardando confirmação ou já foi processado.");
                }
                
            } else {
                alert(data.message || "❌ Erro ao iniciar a transação PIX. Verifique suas credenciais.");
            }
        } catch (error) {
            console.error("🔥 Erro ao gerar PIX:", error);
            alert("Erro de comunicação ao tentar gerar PIX.");
        }
    };

    return (
        <div className="page home">
            {pixData && (
                <PixModal 
                    qrCodeUrl={pixData.qrCodeUrl} 
                    pixCode={pixData.pixCode} 
                    candidate={pixData.candidate}
                    onClose={() => {
                        setPixData(null); 
                        fetchVotes(); // Recarrega os votos ao fechar para ver se o pagamento entrou
                    }}
                />
            )}
            
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