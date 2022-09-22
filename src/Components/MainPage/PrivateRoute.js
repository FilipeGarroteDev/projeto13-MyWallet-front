/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */

import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Contexts/UserContext';

export default function PrivateRoute({ children }) {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    async function validateToken() {
      const storedToken = localStorage.getItem('token');
      try {
        const validatedToken = await axios.post('https://projeto13-mywallet-fgarrote.herokuapp.com/login/sessions', {}, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setUser(validatedToken.data);
      } catch (error) {
        localStorage.clear();
        navigate('/');
      }
    }
    validateToken();
  }, []);

  return (
    <>
      {children}
    </>
  );
}
