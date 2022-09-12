/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-sequences */
/* eslint-disable react/jsx-filename-extension */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { GlobalStyle, Reset } from '../../Common/globalStyle';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Account from '../MainPage/homepage/Account';
import Inflow from '../MainPage/transactionsActions/Inflow';
import Outflow from '../MainPage/transactionsActions/Outflow';
import UserContext from '../../Contexts/UserContext';
import PrivateRoute from '../MainPage/PrivateRoute';
import EditTransactionPage from '../MainPage/transactionsActions/EditTransactionPage';

export default function App() {
  const [user, setUser] = useState({});
  const [isPositiveEntry, setIsPositiveEntry] = useState(true);

  return (
    <UserContext.Provider value={{
      user, setUser, isPositiveEntry, setIsPositiveEntry,
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
          <Route
            path="/edit/:id"
            element={(
              <PrivateRoute>
                <EditTransactionPage />
              </PrivateRoute>
          )}
          />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>

  );
}
