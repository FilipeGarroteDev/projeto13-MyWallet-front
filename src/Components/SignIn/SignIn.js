/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import { Form } from '../../Common/Form';

export default function SignIn() {
  const [login, setLogin] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/account');
    }
  }, []);

  async function sendForm(e) {
    e.preventDefault();
    if (!isClicked) {
      setIsClicked(true);

      if (!login.email || !login.password) {
        alert('Formato inválido de dados.\nO e-mail deve ter formato de email (xxx@xxx.xxx) e a senha não pode ser vazia');
        setIsClicked(false);
        return;
      }

      try {
        const loginPromise = await axios.post('https://projeto13-mywallet-fgarrote.herokuapp.com/login', login);
        localStorage.setItem('token', loginPromise.data);
        navigate('/account');
      } catch (error) {
        alert(error.response.data);
        setIsClicked(false);
      }
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
      <Form onSubmit={sendForm} isClicked={isClicked}>
        <input type="email" name="email" placeholder="E-mail" onChange={handleForm} disabled={!!isClicked} />
        <input type="password" name="password" placeholder="Senha" onChange={handleForm} disabled={!!isClicked} />
        {isClicked
          ? <button type="submit"><ThreeDots color="white" /></button>
          : <button type="submit">Entrar</button>}
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
