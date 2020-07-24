import styled from 'styled-components/native';

import colors from '../../styles/colors';
import { RectButton } from 'react-native-gesture-handler';
export const ItemCount = styled.Text`
  position: absolute;
  text-align: center;
  top: 40px;
  right: 9px;
  min-width: 17px;
  min-height: 17px;
  background: ${colors.red};
  color: ${colors.white};
  font-size: 13px;
  padding: 0px;
  border-radius: 8px;
  overflow: hidden;
`;
export const ContainerCard = styled(RectButton)`
  elevation: 5;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 1;
  background: #fff;
  border-color: #9999;
  border-width: 2;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const TextInfo = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-color: #f4a460;
  border-width: 2;
  border-radius: 50px;
  opacity: ${props => (props.past ? 0.4 : 1)};
`;

export const Info = styled.View`
  margin-left: 10px;
`;
export const Avaliacao = styled.View`
  display: flex;
  flex-direction: row;
  margin-left: 5px;
  margin-top: 5px;
`;
export const Name = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

export const Time = styled.Text`
  margin-top: 4px;
  font-size: 13px;
  color: #999;
`;

export const Canceled = styled.Text`
  margin-top: 4px;
  font-size: 13px;
  font-weight: bold;
  color: #f64c75;
`;
export const TextBadge = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;
