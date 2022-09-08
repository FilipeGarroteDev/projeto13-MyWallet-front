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

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      <Reset />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
          <Route path="/inflow" element={<Inflow />} />
          <Route path="/outflow" element={<Outflow />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>

  );
}
