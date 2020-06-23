import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Menu = styled.div`
  margin-top: 10px;
  width: 490px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: courier, arial, helvetica;
  nav {
    display: flex;
  }
`;

export const LinkMenu = styled(NavLink).attrs({
  activeStyle: { color: '#FF4500' },
})`
  padding-right: 20px;
  font-weight: bold;
  color: #696969;
  transition: color 0.5s;
  &:hover {
    color: #000;
  }
  .active {
    background: #1b9bff;
    transition: 0.5s;
  }
`;
