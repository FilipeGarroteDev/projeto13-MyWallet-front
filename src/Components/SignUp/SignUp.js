/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import React, { useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { Form } from '../../Common/Form';

export default function SignUp() {
  const [isClicked, setIsClicked] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  async function sendForm(e) {
    e.preventDefault();
    if (!isClicked) {
      setIsClicked(true);
      const {
        name, email, password, confirmedPassword,
      } = user;
      if (!name || !email || !password) {
        alert('Todos os campos são de preenchimento obrigatório.\nPor gentileza, revise seus dados! :)');
        setIsClicked(false);
        return;
      } if (confirmedPassword !== password) {
        alert('As senhas informadas são distintas.\nPor gentileza, revise seus dados!');
        setIsClicked(false);
        return;
      }
      try {
        await axios.post('http://localhost:5000/signup', { name, email, password });
        alert('Usuário criado com sucesso!! =)');
        navigate('/');
      } catch (error) {
        alert(error.response.data);
        setIsClicked(false);
      }
    }
  }

  function handleForm(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Container>
      <h1>MyWallet</h1>
      <Form onSubmit={sendForm}>
        <input type="text" name="name" placeholder="Nome" onChange={handleForm} disabled={!!isClicked} />
        <input type="email" name="email" placeholder="E-mail" onChange={handleForm} disabled={!!isClicked} />
        <input type="password" name="password" placeholder="Senha" onChange={handleForm} disabled={!!isClicked} />
        <input type="password" name="confirmedPassword" placeholder="Confirme a senha" onChange={handleForm} disabled={!!isClicked} />
        {isClicked
          ? <button type="submit"><ThreeDots color="white" /></button>
          : <button type="submit">Entrar</button>}
      </Form>
      <Link to="/">
        Já tem uma conta? Entre agora!
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
