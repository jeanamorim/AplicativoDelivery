import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: -300px;

  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
  label {
    cursor: pointer;
    &:hover {
      opacity: 0.4;
    }
    img {
      margin-top: 35px;
      height: 170px;
      width: 170px;
      border-radius: 50%;
      border: 3px solid #999;
      background: #eee;
    }
    input {
      display: none;
    }
  }
`;
