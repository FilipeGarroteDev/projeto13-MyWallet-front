/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

const Header = styled.header`
  height: 80px;
  width: 86%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1, ion-icon{
    font-size: 26px;
    font-weight: 700;
    color: white;
  }

  ion-icon{
    font-size: 32px;
    cursor: pointer;
  }
`;

export { Header };
