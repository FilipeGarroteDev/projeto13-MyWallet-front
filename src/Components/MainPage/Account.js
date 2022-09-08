/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../../Common/Header';

export default function Account() {
  return (
    <Container>
      <Header>
        <h1>Olá, Fulano</h1>
        <span>X</span>
      </Header>
      <TransationsHistoric>
        <span>Não há registros de entrada ou saída</span>
      </TransationsHistoric>
      <Movimentation>
        <Link to="/inflow">
          <div>
            <h1>X</h1>
            <span>Nova entrada</span>
          </div>
        </Link>
        <Link to="/outflow">
          <div>
            <h1>X</h1>
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

const TransationsHistoric = styled.div`
  height: 67%;
  width: 86%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #FFFFFF;

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


    span{
      width: 64px;
      color: #FFFFFF;
      font-size: 17px;
      font-weight: 700;
    }
  }
`;
