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
import PrivateRoute from '../MainPage/PrivateRoute';

export default function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{
      token, setToken, user, setUser,
    }}
    >
      <Reset />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/account"
            element={(
              <PrivateRoute>
                <Account />
              </PrivateRoute>
          )}
          />
          <Route
            path="/inflow"
            element={(
              <PrivateRoute>
                <Inflow />
              </PrivateRoute>
          )}
          />
          <Route
            path="/outflow"
            element={(
              <PrivateRoute>
                <Outflow />
              </PrivateRoute>
          )}
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>

  );
}
