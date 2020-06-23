import { Platform } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import TextInput from '../../components/Input';
import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
`;
export const Image = styled.Image`
  margin-bottom: 0px;
`;
export const GenderContainer = styled.View`
  flex-direction: row;

  justify-content: space-between;
  align-self: stretch;
`;

export const GenderLabel = styled.Text`
  font-size: 15px;
  color: ${colors.medium_gray};
`;

export const FormContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
})`
  align-self: stretch;
`;
export const SubmitButton = styled(Button)`
  margin-top: 5px;
  align-self: stretch;
`;
export const ButtonContainer = styled.View`
  flex-direction: row;
`;
export const DateInput = styled(DatePicker)`
  margin-bottom: ${props => (props.error ? 0 : 10)};
`;

export const Input = styled(TextInput)`
  margin-bottom: ${props => (props.error ? 0 : 2)};
`;
export const TextButton = styled.TouchableOpacity`
  margin-bottom: 1px;
`;
export const TextButtonText = styled.Text`
  text-transform: uppercase;
  font-weight: bold;
  color: ${props => (props.disabled ? colors.inactive : colors.primary)};
  margin-right: 10px;
`;
export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 10px;
`;
export const FormDateInput = styled(DatePicker)`
  margin-bottom: 10px;
`;

export const SignLinkText = styled.Text`
  color: ${colors.dark_gray};
  font-weight: bold;
`;

export const ErroMessageText = styled.Text`
  color: ${colors.error};
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 10px;
`;
