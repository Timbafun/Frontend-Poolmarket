import React from 'react';
import CandidateCard from '../components/CandidateCard';
import './Home.css';

const candidates = [
  { id: 1, name: 'Bolsonaro', photo: 'bolsonaro.jpg' },
  { id: 2, name: 'Lula', photo: 'lula.jpg' }
];

const Home = () => {
  return (
    <div className="home-container">
      <div className="candidates-grid">
        {candidates.map(c => (
          <CandidateCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
};

export default Home;
