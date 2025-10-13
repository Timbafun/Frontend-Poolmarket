import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Checa se o usuário está logado no localStorage
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  const handleVote = (candidato) => {
    if (!user) {
      alert("Você precisa estar logado para votar!");
      return;
    }

    // Aqui você envia o voto para o backend
    alert(`Voto registrado para ${candidato}`);
  };

  return (
    <div>
      <h2 className="page-title">Candidatos</h2>
      <div className="candidates-row">
        <div className="card" onClick={() => handleVote("Lula")}>
          <img src="/lula.jpg" alt="Lula" />
          <h3>Lula</h3>
        </div>
        <div className="card" onClick={() => handleVote("Bolsonaro")}>
          <img src="/bolsonaro.jpg" alt="Bolsonaro" />
          <h3>Bolsonaro</h3>
        </div>
      </div>
    </div>
  );
}
