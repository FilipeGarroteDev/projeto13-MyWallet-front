/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Form } from '../../Common/Form';
import { Header } from '../../Common/Header';

export default function Inflow({ transacoesMockadas }) {
  const [positiveEntry, setPositiveEntry] = useState({});
  const navigate = useNavigate();

  function handleForm(e) {
    setPositiveEntry({
      ...positiveEntry,
      [e.target.name]: e.target.value,
    });
  }

  function submitForm(e) {
    e.preventDefault();
    if (!positiveEntry.value || !positiveEntry.description) {
      alert('Todos os valores são de preenchimento obrigatório.\nPor favor, revise os dados!');
      return;
    }
    transacoesMockadas.push({
      ...positiveEntry,
      date: dayjs(Date.now()).format('DD/MM'),
      type: 'entrada',
    });
    alert('Sua entrada foi registrada! :)');
    navigate('/account');
  }

  return (
    <Container>
      <Header>
        <h1>Nova entrada</h1>
        <span>X</span>
      </Header>
      <Form onSubmit={submitForm}>
        <input type="number" name="value" placeholder="Valor" onChange={handleForm} />
        <input type="text" name="description" placeholder="Descrição" onChange={handleForm} />
        <button type="submit">Salvar entrada</button>
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
