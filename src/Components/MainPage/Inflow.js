/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { Form } from '../../Common/Form';
import { Header } from '../../Common/Header';
import UserContext from '../../Contexts/UserContext';

export default function Inflow() {
  const [positiveEntry, setPositiveEntry] = useState({});
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  function handleForm(e) {
    setPositiveEntry({
      ...positiveEntry,
      [e.target.name]: e.target.value,
    });
    console.log(positiveEntry);
  }

  async function submitForm(e) {
    e.preventDefault();
    if (!isClicked) {
      setIsClicked(true);
      if (!positiveEntry.value || !positiveEntry.description) {
        alert('Todos os valores são de preenchimento obrigatório.\nPor favor, revise os dados!');
        setIsClicked(false);
        return;
      }
      const transaction = {
        ...positiveEntry,
        date: dayjs(Date.now()).format('DD/MM'),
        type: 'entrada',
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
