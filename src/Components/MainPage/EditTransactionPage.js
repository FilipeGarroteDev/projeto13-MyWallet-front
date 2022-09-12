/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import axios from 'axios';
import { Form } from '../../Common/Form';
import { Header } from '../../Common/Header';
import UserContext from '../../Contexts/UserContext';

export default function EditTransactionPage() {
  const { id } = useParams();
  const [newEntry, setNewEntry] = useState({});
  const { token, isPositiveEntry } = useContext(UserContext);
  const navigate = useNavigate();

  function handleForm(e) {
    setNewEntry({
      ...newEntry,
      [e.target.name]: isNaN(e.target.value) ? e.target.value : Number(e.target.value).toFixed(2),
    });
  }

  async function submitForm(e) {
    e.preventDefault();
    if (!newEntry.value || !newEntry.description) {
      alert('Todos os valores são de preenchimento obrigatório.\nPor favor, revise os dados!');
      return;
    }
    const transaction = {
      ...newEntry,
      date: dayjs(Date.now()).format('DD/MM'),
    };

    try {
      await axios.put(`http://localhost:5000/transactions/${id}`, transaction, { headers: { Authorization: token } });
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
        {isPositiveEntry ? <h1>Editar entrada</h1> : <h1>Editar saída</h1> }
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
        {isPositiveEntry
          ? <button type="submit">Atualizar entrada</button>
          : <button type="submit">Atualizar saída</button>}
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
