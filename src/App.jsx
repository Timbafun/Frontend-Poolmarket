import React from 'react';
import RegisterForm from './components/RegisterForm';
import CandidateCard from './components/CandidateCard';
import './App.css';

const candidates = [
  { id: 1, name: 'Candidato 1', photo: 'cand1.jpg' },
  { id: 2, name: 'Candidato 2', photo: 'cand2.jpg' },
  { id: 3, name: 'Candidato 3', photo: 'cand3.jpg' }
];

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Poolmarket</h1>
        <p>Vote no seu candidato favorito</p>
      </header>

      <section className="register-section">
        <h2>Cadastro de Usuário</h2>
        <RegisterForm />
      </section>

      <section className="candidates-section">
        <h2>Candidatos</h2>
        <div className="candidates-grid">
          {candidates.map(c => <CandidateCard key={c.id} {...c} />)}
        </div>
      </section>
    </div>
  );
}

export default App;
