/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */

import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Header } from '../../Common/Header';
import UserContext from '../../Contexts/UserContext';

export default function Account() {
  const { user, token } = useContext(UserContext);
  const [transactionsList, setTransactionsList] = useState([]);
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
            alert('Até mais, Fulano!! :)');
            navigate('/');
          }}
        />
      </Header>
      <TransactionsContainer trans={transactionsList}>
        {transactionsList.length === 0
          ? <span>Não há registros de entrada ou saída</span>
          : <Transactions transactionsList={transactionsList} />}
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

function Transactions({ transactionsList }) {
  let balance = 0;

  function calculateBalance() {
    transactionsList.forEach((mov) => {
      if (mov.type === 'entrada') {
        balance += Number(mov.value);
      } else if (mov.type === 'saída') {
        balance -= Number(mov.value);
      }
    });
    return balance;
  }
  calculateBalance();

  return (
    <TransactionsHistoric balance={balance}>
      <ul>
        {transactionsList.map(({
          date, description, value, type,
        }, key) => (
          <Operation key={key} type={type}>
            <p>
              <em>{date}</em>
              {' '}
              {description}
            </p>
            <strong>{value}</strong>
          </Operation>
        ))}
      </ul>
      <section>
        <h3>SALDO</h3>
        <p><strong>{balance.toFixed(2)}</strong></p>
      </section>
    </TransactionsHistoric>
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

  span{
      width: 180px;
      font-size: 20px;
      color: #868686;
      text-align: center;
    }
`;

const TransactionsHistoric = styled.div`
  height: 100%;

  ul {
    height: 97%;
    display: flex;
    flex-direction: column;
    gap:20px;
    overflow-y: auto;
    padding-bottom: 20px;
  }

  section{
    display: flex;
    justify-content: space-between;

    h3{
      font-size: 17px;
      font-weight: 700;
    }
    strong{
      color: ${(props) => (props.balance >= 0 ? '#03AC00' : '#C70000')}
    }
  }
`;

const Operation = styled.li`
  display: flex;
  justify-content: space-between;

  em{
    color: #c6c6c6;
  }
  strong{
    color: ${(props) => (props.type === 'saída' ? '#C70000' : '#03AC00')}
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


    span{
      width: 64px;
      color: #FFFFFF;
      font-size: 17px;
      font-weight: 700;
    }
  }

  ion-icon{
    color: #ffffff;
    font-size: 32px
  }
`;
