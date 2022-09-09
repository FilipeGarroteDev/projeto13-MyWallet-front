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
  const [users, setUsers] = useState([{ name: 'sdajdao', email: '123@123.123', password: '123' }]);
  const transacoesMockadas = [];

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
