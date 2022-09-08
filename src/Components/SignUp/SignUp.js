/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import React, { useContext } from 'react';
import { Form } from '../../Common/Form';
import UserContext from '../../Contexts/UserContext';

export default function SignIn() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function sendForm(e) {
    e.preventDefault();
    const {
      name, email, password, confirmedPassword,
    } = user;
    if (!name || !email || !password) {
      alert('Todos os campos são de preenchimento obrigatório.\nPor gentileza, revise seus dados! :)');
      return;
    } if (confirmedPassword !== password) {
      alert('As senhas informadas são distintas.\nPor gentileza, confirme corretamente sua senha.');
      return;
    }
    console.log(user);
    alert(`Usuário criado com sucesso!!\nBem-vindo ${name}!!! =)`);
    navigate('/');
  }

  function handleForm(bolinha) {
    setUser({
      ...user,
      [bolinha.target.name]: bolinha.target.value,
    });
  }

  return (
    <Container>
      <h1>MyWallet</h1>
      <Form onSubmit={sendForm}>
        <input type="text" name="name" placeholder="Nome" onChange={handleForm} />
        <input type="email" name="email" placeholder="E-mail" onChange={handleForm} />
        <input type="password" name="password" placeholder="Senha" onChange={handleForm} />
        <input type="password" name="confirmedPassword" placeholder="Confirme a senha" onChange={handleForm} />
        <button type="submit">Cadastrar</button>
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
