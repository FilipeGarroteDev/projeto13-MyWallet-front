/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import axios from 'axios';
import { Form } from '../../Common/Form';
import { Header } from '../../Common/Header';
import UserContext from '../../Contexts/UserContext';

export default function Inflow() {
  const [positiveEntry, setPositiveEntry] = useState({});
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  function handleForm(e) {
    setPositiveEntry({
      ...positiveEntry,
      [e.target.name]: isNaN(e.target.value) ? e.target.value : Number(e.target.value).toFixed(2),
    });
  }

  async function submitForm(e) {
    e.preventDefault();
    if (!positiveEntry.value || !positiveEntry.description) {
      alert('Todos os valores são de preenchimento obrigatório.\nPor favor, revise os dados!');
      return;
    }
    const transaction = {
      ...positiveEntry,
      date: dayjs(Date.now()).format('DD/MM'),
      type: 'entrada',
    };

    try {
      await axios.post('http://localhost:5000/transactions', transaction, { headers: { Authorization: token } });
    } catch (error) {
      console.log(error.message);
    }

    alert('Sua entrada foi registrada! :)');
    navigate('/account');
  }

  return (
    <Container>
      <Header>
        <h1>Nova entrada</h1>
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
