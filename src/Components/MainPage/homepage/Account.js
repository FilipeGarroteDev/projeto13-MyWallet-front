/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Header } from '../../../Common/Header';
import UserContext from '../../../Contexts/UserContext';
import Transactions from './Transactions';

export default function Account() {
  const { user } = useContext(UserContext);
  const [transactionsList, setTransactionsList] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const transactions = await axios.get('http://localhost:5000/transactions', {
          headers: {
            Authorization: token,
          },
        });
        setTransactionsList(transactions.data);
      } catch (error) {
        alert(error.response.data);
        localStorage.clear();
        navigate('/');
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Header>
        <h1>
          Olá,
          {' '}
          {user.name}
        </h1>
        <ion-icon
          name="exit-outline"
          onClick={() => {
            localStorage.clear();
            alert(`Até mais, ${user.name}!! :)`);
            navigate('/');
          }}
        />
      </Header>
      <TransactionsContainer trans={transactionsList}>
        {transactionsList.length === 0
          ? <span>Não há registros de entrada ou saída</span>
          : (
            <Transactions
              transactionsList={transactionsList}
              setTransactionsList={setTransactionsList}
            />
          )}
      </TransactionsContainer>
      <Movimentation>
        <Link to="/inflow">
          <div>
            <ion-icon name="add-circle-outline" />
            <span>Nova entrada</span>
          </div>
        </Link>
        <Link to="/outflow">
          <div>
            <ion-icon name="remove-circle-outline" />
            <span>Nova saída</span>
          </div>
        </Link>
      </Movimentation>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TransactionsContainer = styled.div`
  height: 67%;
  width: 86%;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.trans.length === 0 ? 'center' : 'space-between')};
  align-items: ${(props) => (props.trans.length === 0 ? 'center' : 'space-between')};
  border-radius: 5px;
  background-color: #FFFFFF;
  padding: 12px;
  padding-top: 23px;
  padding-bottom: 20px;

  span{
      width: 180px;
      font-size: 20px;
      color: #868686;
      text-align: center;
    }
`;

const Movimentation = styled.div`
  height: 21%;
  width: 86%;
  display: flex;
  align-items: center;
  gap: 15px;

  a{
    height: 80%;
    width: 100%;
  }

  div{
    height: 100%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    background-color: #A328D6;

    &:hover{
      cursor:pointer;
      filter: brightness(110%);
    }


    span{
      width: 64px;
      color: #FFFFFF;
      font-size: 17px;
      font-weight: 700;
    }
  }

  ion-icon{
    color: #ffffff;
    font-size: 32px;
  }
`;
