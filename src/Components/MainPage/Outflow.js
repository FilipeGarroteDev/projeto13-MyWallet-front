/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../Common/Form';
import { Header } from '../../Common/Header';

export default function Outflow({ transacoesMockadas }) {
  const [negativeEntry, setNegativeEntry] = useState({});
  const navigate = useNavigate();

  function handleForm(e) {
    setNegativeEntry({
      ...negativeEntry,
      [e.target.name]: e.target.value,
    });
  }

  function submitForm(e) {
    e.preventDefault();
    if (!negativeEntry.value || !negativeEntry.description) {
      alert('Todos os campos são de preenchimento obrigatório.\nPor favor, revise seus dados.');
      return;
    }
    transacoesMockadas.push({
      ...negativeEntry,
      date: dayjs(Date.now()).format('DD/MM'),
      type: 'saída',
    });
    alert('Sua movimentação foi registrada!! :)');
    navigate('/account');
  }

  return (
    <Container>
      <Header>
        <h1>Nova saída</h1>
        <span>X</span>
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
