import styled from 'styled-components/native';
import colors from '../../styles/colors';
import { RectButton } from 'react-native-gesture-handler';

export const ButtonAdd = styled(RectButton)`
  elevation: 8;

  margin-left: 20%;
  padding: 6px;
  border-radius: 35;
  width: 60%;
  background: #f4a460;
  border-color: #000;
  border-width: 2;
  flex-direction: row;
`;
export const TextInfo = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;
export const CartTotal = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  height: 60px;
  width: 100%;
  border-color: #e8e8e8;
  border-width: 2;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const CartTotalLabel = styled.Text`
  font-size: 20px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  margin: 7px;
`;

export const CartTotalValue = styled.Text`
  font-size: 20px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  margin: 7px;
  margin-left: 30%;
`;
