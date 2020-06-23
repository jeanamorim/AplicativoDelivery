import styled from 'styled-components/native';
import TextInput from '../../components/Input';
import { RectButton } from 'react-native-gesture-handler';
import Button from '../../components/Button';

export const Input = styled(TextInput)`
  margin-bottom: ${props => (props.error ? 0 : 10)};
`;

export const SubmitButton = styled(Button)`
  background: #f4a460;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px;
  color: #fff;
  border-radius: 4px;
  margin: -20px;
  margin-top: 281px;
  margin-left: -10px;
`;
export const SubmitButtonEdit = styled(Button)`
  background: #f4a460;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px;
  color: #fff;
  border-radius: 4px;
  margin: 1px;
  margin-top: 0px;
  margin-left: 1px;
  margin-right: 1px;
`;
export const CheckoutButton = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;

  border-radius: 4px;
  margin: 0px;
`;
export const Card = styled.View`
  border-radius: 4px;
  padding: 10px;
  background-color: #fff;

  margin-left: 2px;
  margin-right: 2px;
  margin-top: 2px;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const CardTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #f4a460;
  margin-left: 5px;
`;

export const Title = styled.Text`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
  color: #999999;
  margin-bottom: 2px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-bottom: 15px;
`;
export const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
export const CheckoutButtonComfirm = styled.View`
  background: #f4a460;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px;
  color: #fff;
  border-radius: 4px;
  margin: 0px;
  margin-top: 22px;
  margin-left: -10px;
`;
