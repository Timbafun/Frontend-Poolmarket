import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css'; // mantém o CSS atual

const RegisterForm = () => {
  const [form, setForm] = useState({ nome:'', email:'', telefone:'', cpf:'' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({...form,[e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://backend-poolmarket.onrender.com/users/register', form);
      setMessage(res.data.message);
    } catch(err) {
      setMessage(err.response?.data?.message || 'Erro no cadastro');
    }
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required/>
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required/>
      <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" required/>
      <input name="cpf" value={form.cpf} onChange={handleChange} placeholder="CPF" required/>
      <button type="submit">Cadastrar</button>
      <p className="form-message">{message}</p>
    </form>
  )
}

export default RegisterForm;
