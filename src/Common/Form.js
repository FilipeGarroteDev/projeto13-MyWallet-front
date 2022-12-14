/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  input{
    height: 60px;
    width: 86%;
    border-radius: 5px;
    font-size: 20px;
    padding-left: 15px;
    border: none;
    outline: none;

    &::placeholder{
      color: #797979;
    }
  }

  button{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 86%;
    border-radius: 5px;
    padding-left: 15px;
    border: none;
    background-color: #A328D6;
    font-size: 20px;
    font-weight: 700;
    color: #FFFFFF;

    &:hover{
      cursor: pointer;
      filter: brightness(110%);
    }
  }
`;

export { Form };
