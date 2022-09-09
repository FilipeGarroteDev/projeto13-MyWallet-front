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
  const { token, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const validatedToken = await axios.post('http://localhost:5000/login/sessions', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(validatedToken.data);
      } catch (error) {
        navigate('/');
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {children}
    </>
  );
}
