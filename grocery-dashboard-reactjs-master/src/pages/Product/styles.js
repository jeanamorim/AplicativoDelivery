import styled from 'styled-components';

export const Containerr = styled.table`
  max-width: 1300px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  font-family: courier, arial, helvetica;
  border-width: 1px;
  border-style: solid;
  border-color: #ffd39b;

  header {
    display: flex;
    align-items: center;
    font-size: 25px;
    color: #1c1c1c;
    -webkit-font-smoothing: antialiased !important;
    font-family: courier, arial, helvetica;
  }

  a {
    font-family: courier, arial, helvetica;
    color: #fff;
    font-size: 23px;
    -webkit-font-smoothing: antialiased !important;
    &:hover {
      color: #ff4500;
    }
  }
  ul {
    margin: 0px auto;
    width: 100%;
    list-style: none;
    display: grid;
    grid-gap: 20px;
    margin-bottom: 30px;
    grid-template-columns: repeat(5, 1fr);
    font-family: courier, arial, helvetica;

    li {
      display: flex;
      flex-direction: column;
      font-family: courier, arial, helvetica;
      width: 60%;
      height: 60px;
      border-radius: 100px;
      header {
        max-width: 280px;
        width: 50%;
        height: 110px;
        background-size: cover;
        border-radius: 4px;
        filter: brightness(88%);
        border-radius: 20px;
        font-family: courier, arial, helvetica;
        &:hover {
          -webkit-transform: scale(1.1);
          -moz-transform: scale(1.1);
          -o-transform: scale(1.1);
          -ms-transform: scale(1.1);
          transform: scale(1.1);
        }
      }
      strong {
        position: absolute;
        margin-top: 44px;
        align-items: center;
        color: #fff;
        font-size: 20px;
        font-family: courier, arial, helvetica;
      }
    }
  }
`;

export const ProductTable = styled.table`
  margin: 50px auto;
  background: #f8f8ff;
  width: 99%;
  border-width: 1px;
  border-style: solid;
  border-color: #ffd39b;
  font-family: courier, arial, helvetica;
  thead th {
    color: #999;
    text-align: left;
    padding: 10px;
    font-family: courier, arial, helvetica;
  }
  tbody td {
    padding: 15px;
    border-bottom: 1px solid #999;
    font-family: courier, arial, helvetica;
  }
  img {
    height: 50px;

    &:hover {
      -webkit-transform: scale(1.1);
      -moz-transform: scale(1.1);
      -o-transform: scale(1.1);
      -ms-transform: scale(1.1);
      transform: scale(1.1);
    }
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 19px;
    font-weight: bold;
    font-family: courier, arial, helvetica;
  }

  button {
    background: none;
    border: 0;
    padding: 2px;
    font-family: courier, arial, helvetica;
  }
`;

export const Buttonn = styled.div`
  max-width: 1500px;
  font-size: 19px;
  margin: 20px auto;
  font-family: courier, arial, helvetica;
  header {
    a {
      padding: 10px;
      font-size: 19px;
      font-family: courier, arial, helvetica;
    }
  }
`;
