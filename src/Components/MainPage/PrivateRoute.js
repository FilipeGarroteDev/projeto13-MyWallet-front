/* eslint-disable react/jsx-filename-extension */
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Contexts/UserContext';

export default async function PrivateRoute({ children }) {
  const { token, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  try {
    const authLogin = axios.post('http://localhost:5000/login/sessions', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(authLogin.data);
    return ({ children });
  } catch (error) {
    alert(error.response.data);
    navigate('/');
  }
}
