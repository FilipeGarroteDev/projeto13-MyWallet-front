/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-filename-extension */
import axios from 'axios';
import styled from 'styled-components';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../Contexts/UserContext';

export default function Transactions({ transactionsList, setTransactionsList }) {
  const { token, setIsPositiveEntry } = useContext(UserContext);
  const navigate = useNavigate('/');

  const balance = transactionsList.reduce((acc, cur) => {
    if (cur.type === 'entrada') {
      return acc + Number(cur.value);
    }
    return acc - Number(cur.value);
  }, 0);

  async function deleteTransaction(transactionId) {
    const config = {
      headers: {
        Authorization: token,
      },
    };

    if (window.confirm('Tem certeza que quer excluir essa transação?')) {
      try {
        await axios.delete(`http://localhost:5000/transactions/${transactionId}`, config);
        const newTransactionsList = await axios.get('http://localhost:5000/transactions', config);
        setTransactionsList(newTransactionsList.data);
      } catch (error) {
        alert(error.response.data);
      }
    }
  }

  return (
    <TransactionsHistoric balance={balance}>
      <ul>
        {transactionsList.map(({
          date, description, value, type, _id,
        }, key) => (
          <Operation key={key} type={type}>
            <p>
              <i>{date}</i>
              <span onClick={() => {
                if (type === 'saída') {
                  setIsPositiveEntry(false);
                  navigate(`/edit/${_id}`);
                } else if (type === 'entrada') {
                  setIsPositiveEntry(true);
                  navigate(`/edit/${_id}`);
                }
              }}
              >
                {description}

              </span>
            </p>
            <p>
              <strong>{Number(value).toFixed(2)}</strong>
              <em onClick={() => deleteTransaction(_id)}>x</em>
            </p>
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

const TransactionsHistoric = styled.div`
  height: 100%;

  ul {
    height: 93%;
    display: flex;
    flex-direction: column;
    gap:20px;
    overflow-y: auto;
    margin-bottom: 20px;

    ::-webkit-scrollbar{
      width: 0px;
    }
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

  &&{
    span{
    margin-left: 10px;
    font-size: 16px;
    color: #000000;

      &:hover{
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  
  i{
    color: #c6c6c6;
  }

  em{
    color: #c6c6c6;
    &:hover {
      cursor: pointer;
      filter: brightness(30%);
    }
  }

  strong{
    color: ${(props) => (props.type === 'saída' ? '#C70000' : '#03AC00')};
    margin-right: 10px;
  }
`;
