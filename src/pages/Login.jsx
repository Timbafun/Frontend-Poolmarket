import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email:'', cpf:'' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // aqui você pode adicionar autenticação real
      setMessage('Login realizado com sucesso!');
    } catch(err) {
      setMessage('Erro no login');
    }
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="cpf" value={form.cpf} onChange={handleChange} placeholder="CPF" required />
        <button type="submit">Entrar</button>
      </form>
      <p className="form-message">{message}</p>
    </div>
  );
};

export default Login;
