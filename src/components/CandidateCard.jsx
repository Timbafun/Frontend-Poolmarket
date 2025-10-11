import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CandidateCard.css'; // mantém o CSS atual

const CandidateCard = ({ id, name, photo }) => {
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    const fetchVotes = async () => {
      const res = await axios.get(`https://backend-poolmarket.onrender.com/votes/${id}`);
      setVotes(res.data.votes);
    }
    fetchVotes();
  }, [id]);

  return (
    <div className="candidate-card">
      <img src={`/images/${photo}`} alt={name} />
      <h3>{name}</h3>
      <p className="votes-count">{votes} votos</p>
    </div>
  )
}

export default CandidateCard;
