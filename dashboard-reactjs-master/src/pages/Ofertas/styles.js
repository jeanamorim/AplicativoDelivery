import styled from 'styled-components';

export const Buttonn = styled.div`
  font-size: 20px;
  margin: 20px auto;
  font-family: courier, arial, helvetica;

  a {
    padding: 10px;

    button {
      background-color: #32cd32;
      border-radius: 4px;

      width: 13%;
      height: 42px;
      color: #fff;
      -webkit-font-smoothing: antialiased !important;
      font-family: courier, arial, helvetica;

      &:hover {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -o-transform: scale(1.1);
        -ms-transform: scale(1.1);
        transform: scale(1.1);
      }
    }
  }
`;
