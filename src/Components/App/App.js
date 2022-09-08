/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-sequences */
/* eslint-disable react/jsx-filename-extension */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { GlobalStyle, Reset } from '../../Common/globalStyle';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Account from '../MainPage/Account';
import Inflow from '../MainPage/Inflow';
import Outflow from '../MainPage/Outflow';
import UserContext from '../../Contexts/UserContext';

export default function App() {
  const [users, setUsers] = useState([]);
  const transacoesMockadas = [{
    date: '10/07', description: 'Rolê', value: '39.90', type: 'saída',
  }, {
    date: '15/08', description: 'Computador', value: '3900.90', type: 'saída',
  }, {
    date: '20/12', description: 'Presente de Natal', value: '150.00', type: 'saída',
  }, {
    date: '01/07', description: 'Salário', value: '15000.00', type: 'entrada',
  }];

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      <Reset />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account transacoesMockadas={transacoesMockadas} />} />
          <Route path="/inflow" element={<Inflow transacoesMockadas={transacoesMockadas} />} />
          <Route path="/outflow" element={<Outflow transacoesMockadas={transacoesMockadas} />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>

  );
}
