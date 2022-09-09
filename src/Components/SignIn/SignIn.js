/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Form } from '../../Common/Form';

export default function SignIn() {
  const [login, setLogin] = useState({});
  const navigate = useNavigate();

  async function sendForm(e) {
    e.preventDefault();

    if (!login.email || !login.password) {
      alert('Todos os campos são de preenchimento obrigatório.\nPor gentileza, verifique seus dados.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/login', login);
      alert(`Seja bem vindo, ${foundUser.name}!! =)`);
      navigate('/account');
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleForm(e) {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Container>
      <h1>MyWallet</h1>
      <Form onSubmit={sendForm}>
        <input type="email" name="email" placeholder="E-mail" onChange={handleForm} />
        <input type="password" name="password" placeholder="Senha" onChange={handleForm} />
        <button type="submit">Entrar</button>
      </Form>
      <Link to="/signup">
        Primeira vez? Cadastre-se!
      </Link>
    </Container>
  );
}

const Container = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1{
    font-family: "Saira Stencil One", sans-serif;
    font-size: 32px;
    color: white;
    margin-bottom: 26px;
  }

  a {
    font-size: 15px;
    font-weight: 700;
    color: white;
    margin-top: 36px;
  }
`;
