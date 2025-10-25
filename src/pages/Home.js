import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import PixModal from "../components/PixModal"; 
import "./Home.css";

// URL do seu Backend (Importado do .env do Netlify)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "https://backend-poolmarket.onrender.com";

export default function Home() {
    const [votes, setVotes] = useState({ lula: 0, bolsonaro: 0 });
    const [pixData, setPixData] = useState(null); 
    const navigate = useNavigate();
    
    const { user, isAuthenticated } = useAuth();

    // Função para buscar votos do Backend
    const fetchVotes = useCallback(async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/votes`);
            const data = await res.json();
            if (res.ok) {
                // CORREÇÃO CRÍTICA AQUI: O Backend retorna o objeto de votos DIRETAMENTE.
                setVotes(data); 
            }
        } catch (error) {
            console.error("Erro ao carregar votos:", error);
            // Se o erro de comunicação continuar, é problema de Backend (CORS, servidor down)
        }
    }, []); 

    // Carrega os votos na inicialização
    useEffect(() => {
        fetchVotes(); 
    }, [fetchVotes]); 


    // Lógica de Voto: AGORA GERA O PIX
    const handleVote = async (candidate) => {
        
        // Valor fixo de contribuição para o voto
        const VOTE_AMOUNT = 1.00; 

        if (!isAuthenticated || !user || !user.token) {
            alert("Você precisa estar logado para votar.");
            navigate("/login");
            return;
        }
        
        // CORREÇÃO: Certifique-se de que user.hasVoted está sendo lido corretamente.
        // Se o Backend estiver retornando a propriedade em camelCase ou snake_case diferente, adapte aqui.
        if (user.hasVoted) {
            alert("Você já votou. Cada usuário só pode votar uma vez.");
            return;
        }

        try {
            // ✅ CHAMA A NOVA ROTA DE GERAÇÃO DE PIX
            const response = await fetch(`${BACKEND_URL}/api/generate-pix`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({ 
                    candidate, 
                    amount: VOTE_AMOUNT // Envia o valor fixo
                }),
            });

            const data = await response.json();

            if (response.ok && data.ok) {
                // ✅ Salva os dados do PIX para abrir o modal
                setPixData({ 
                    qrCodeUrl: data.qrCodeUrl, 
                    pixCode: data.pixCode, 
                    candidate 
                });
                
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