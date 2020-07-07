import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
export const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 10px;
`;

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

export const DateRow = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
`;

export const DateContainer = styled.View`
  flex-direction: column;
`;

export const Actions = styled.View`
  border-radius: 4px;
  background-color: #f8f9fd;
  flex-direction: row;
  align-self: stretch;
`;

export const ActionButton = styled(RectButton)`
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

export const VerticalSeparator = styled.View`
  width: 1px;
  background-color: #0000001a;
  align-self: stretch;
`;

export const ActionButtonText = styled.Text`
  font-size: 12px;
  color: #999999;
`;
export const Line = styled.View`
  height: 1px;
  background: #f4a460;
  border: 1px solid #f4a460;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 50px;
`;

export const StatusContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const DotPendente = styled.View`
  width: 60px;
  height: 60px;
  border: 1px solid #ee9a49;
  border-width: 2;
  border-width: 2;
  border-radius: 30px;
  background: #ee9a49;
  opacity: ${props => (props.filled ? 4 : 0.1)};
  margin-bottom: 5px;
`;
export const LabelPendente = styled.Text`
  color: #ee9a49;
  font-weight: bold;
  font-size: 11px;
  max-width: 90px;
  text-align: center;
`;
export const DotProducao = styled.View`
  width: 60px;
  height: 60px;
  border: 1px solid #ff0000;
  border-width: 2;
  border-radius: 30px;
  background: #ff0000;
  opacity: ${props => (props.filled ? 4 : 0.1)};
  margin-bottom: 5px;
`;
export const LabelProducao = styled.Text`
  color: #ff0000;
  font-weight: bold;
  font-size: 11px;
  max-width: 90px;
  text-align: center;
`;
export const DotEnviado = styled.View`
  width: 60px;
  height: 60px;
  border: 1px solid #0000cd;
  border-width: 2;
  border-radius: 30px;
  background: #0000cd;
  opacity: ${props => (props.filled ? 4 : 0.1)};
  margin-bottom: 5px;
`;
export const LabelEnviado = styled.Text`
  color: #0000cd;
  font-weight: bold;
  font-size: 11px;
  max-width: 90px;
  text-align: center;
`;
export const DotEntregue = styled.View`
  width: 60px;
  height: 60px;
  border: 1px solid #00ff00;
  border-width: 2;
  border-radius: 30px;
  background: #00ff00;
  opacity: ${props => (props.filled ? 4 : 0.1)};
  margin-bottom: 5px;
`;
export const LabelEntregue = styled.Text`
  color: #00ff00;
  font-weight: bold;
  font-size: 11px;
  max-width: 90px;
  text-align: center;
`;
export const DotCancelado = styled.View`
  width: 60px;
  height: 60px;
  border: 1px solid #ff0000;
  border-width: 2;
  border-radius: 30px;
  background: #ff0000;
  opacity: ${props => (props.filled ? 4 : 0.1)};
  margin-bottom: 5px;
`;
export const LabelCancelado = styled.Text`
  color: #ff0000;
  font-weight: bold;
  font-size: 11px;
  max-width: 90px;
  text-align: center;
`;
export const LabelContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.Text`
  color: #f4a460;
  font-weight: bold;
  font-size: 8px;
  max-width: 90px;
  text-align: center;
`;
export const HeaderBackground = styled.View`
  position: absolute;
  background: #f4a460;
  height: 155px;
  width: ${Dimensions.get('window').width}px;
`;
