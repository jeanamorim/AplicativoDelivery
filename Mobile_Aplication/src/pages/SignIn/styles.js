import { Platform } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import TextInput from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const FormContainer = styled.View`
  align-self: stretch;
  margin-top: 0px;
`;
export const SubmitButton = styled(Button)`
  margin-top: 20px;
  align-self: stretch;
`;

export const Input = styled(TextInput)`
  margin-bottom: ${props => (props.error ? 0 : 10)};
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignLinkText = styled.Text`
  color: ${colors.dark_gray};
  font-weight: bold;
  font-size: 16px;
`;

export const ErroMessageText = styled.Text`
  color: ${colors.error};
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 10px;
`;
