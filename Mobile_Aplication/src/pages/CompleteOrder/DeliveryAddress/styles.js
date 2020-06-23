import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  border-radius: 2px;
`;

export const FormContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 10,
  },
})``;

export const Card = styled.View`
  border-radius: 4px;
  padding: 13px;
  background-color: #fff;
  margin-bottom: 10px;
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
export const CheckoutButton = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;

  border-radius: 4px;
  margin: 0px;
`;
