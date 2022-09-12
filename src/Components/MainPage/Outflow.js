/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form } from '../../Common/Form';
import { Header } from '../../Common/Header';
import UserContext from '../../Contexts/UserContext';

export default function Outflow() {
  const [negativeEntry, setNegativeEntry] = useState({});
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  function handleForm(e) {
    setNegativeEntry({
      ...negativeEntry,
      [e.target.name]: isNaN(e.target.value) ? e.target.value : Number(e.target.value).toFixed(2),
    });
  }

  async function submitForm(e) {
    e.preventDefault();
    if (!negativeEntry.value || !negativeEntry.description) {
      alert('Todos os campos são de preenchimento obrigatório.\nPor favor, revise seus dados.');
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
      navigate('/');
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
        <input type="number" name="value" placeholder="Valor" onChange={handleForm} />
        <input type="text" name="description" placeholder="Descrição" onChange={handleForm} />
        <button type="submit">Salvar saída</button>
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
