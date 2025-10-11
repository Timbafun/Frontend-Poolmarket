import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CandidateCard from "../components/CandidateCard";
import { api } from "../api";

export default function Home() {
  const [candidatos, setCandidatos] = useState([]);

  const carregarCandidatos = async () => {
    const res = await api.get("/api/votos");
    const lista = res.data.map((c) => ({
      ...c,
      imagem:
        c.nome.includes("Bolsonaro")
          ? "https://upload.wikimedia.org/wikipedia/commons/8/80/Jair_Bolsonaro_2022.jpg"
          : "https://upload.wikimedia.org/wikipedia/commons/4/4e/Lula_-_2023_%28cropped%29.jpg",
    }));
    setCandidatos(lista);
  };

  const votar = async (candidato_id) => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return alert("Você precisa fazer login primeiro.");

    try {
      await api.post("/api/votar", { user_id, candidato_id });
      alert("Voto computado com sucesso!");
      carregarCandidatos();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao votar");
    }
  };

  useEffect(() => {
    carregarCandidatos();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Faça seu voto</h2>
        <div className="candidates">
          {candidatos.map((c) => (
            <CandidateCard key={c.id} candidato={c} onVotar={votar} />
          ))}
        </div>
      </div>
    </>
  );
}
