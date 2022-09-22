/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import axios from 'axios';
import { Form } from '../../../Common/Form';
import { Header } from '../../../Common/Header';
import UserContext from '../../../Contexts/UserContext';

export default function EditTransactionPage() {
  const { id } = useParams();
  const [newEntry, setNewEntry] = useState({});
  const { isPositiveEntry } = useContext(UserContext);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  function handleForm(e) {
    setNewEntry({
      ...newEntry,
      [e.target.name]: e.target.value,
    });
  }

  async function submitForm(e) {
    e.preventDefault();
    if (!newEntry.value && !newEntry.description) {
      alert('Você precisa preencher pelo menos um dos campos.\nPor favor, revise os dados!');
      return;
    }
    const transaction = {
      ...newEntry,
      date: dayjs(Date.now()).format('DD/MM'),
    };

    try {
      await axios.put(`https://projeto13-mywallet-fgarrote.herokuapp.com/transactions/${id}`, transaction, { headers: { Authorization: token } });
      alert('Sua entrada foi registrada! :)');
      navigate('/account');
    } catch (error) {
      alert('Seu acesso expirou. Por gentileza, refaça o login!');
      localStorage.clear();
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
        <input type="number" name="value" placeholder="Valor" step="any" onChange={handleForm} />
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
