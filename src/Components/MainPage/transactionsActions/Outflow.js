/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { Form } from '../../../Common/Form';
import { Header } from '../../../Common/Header';

export default function Outflow() {
  const [negativeEntry, setNegativeEntry] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  function handleForm(e) {
    setNegativeEntry({
      ...negativeEntry,
      [e.target.name]: e.target.value,
    });
  }

  async function submitForm(e) {
    e.preventDefault();
    if (!isClicked) {
      setIsClicked(true);
      if (!negativeEntry.value || !negativeEntry.description) {
        alert('Todos os campos são de preenchimento obrigatório.\nPor favor, revise seus dados.');
        setIsClicked(false);
        return;
      }
      const transaction = {
        ...negativeEntry,
        date: dayjs(Date.now()).format('DD/MM'),
        type: 'saída',
      };

      try {
        await axios.post('http://localhost:5000/transactions', transaction, { headers: { Authorization: token } });
        alert('Sua entrada foi registrada! :)');
        navigate('/account');
      } catch (error) {
        alert('Seu acesso expirou. Por gentileza, refaça o login!');
        localStorage.clear();
        navigate('/');
      }
    }
  }

  return (
    <Container>
      <Header>
        <h1>Nova saída</h1>
        <ion-icon
          name="exit-outline"
          onClick={() => {
            navigate('/account');
          }}
        />
      </Header>
      <Form onSubmit={submitForm}>
        <input type="number" name="value" placeholder="Valor" onChange={handleForm} step="any" disabled={!!isClicked} />
        <input type="text" name="description" placeholder="Descrição" onChange={handleForm} disabled={!!isClicked} />
        {isClicked
          ? <button type="submit"><ThreeDots color="white" /></button>
          : <button type="submit">Entrar</button>}
      </Form>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
