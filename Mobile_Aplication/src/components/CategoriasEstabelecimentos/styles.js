import styled from 'styled-components/native';
import { BaseButton } from 'react-native-gesture-handler';
import { darken } from 'polished';
import Swiper from 'react-native-swiper';
import colors from '../../styles/colors';

import { RectButton } from 'react-native-gesture-handler';

export const ImageSlide = styled(Swiper).attrs({
  autoplay: true,
  showsPagination: false,
  showsButtons: false,
  height: 220,
})``;

export const ProductList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const AddButton = styled(BaseButton)`
  background: ${colors.primary};
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  margin-top: auto;
`;

export const ProductAmount = styled.View`
  padding: 10px;
  background: ${darken(0.03, colors.primary)};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const ProductAmountText = styled.Text`
  color: ${colors.white};
  font-size: 12px;
  margin: 0px 4px 0px 10px;
`;

export const AddButtonText = styled.Text`
  flex: 1;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  color: ${colors.white};
`;
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

export const BasketButton = styled.TouchableOpacity`
  margin-left: 280px;
  margin-top: 450px;
  background-color: #f4a460;
  height: 64;
  width: 64;
  align-items: flex-end;
  justify-content: flex-end;
  border-color: #e25b08;
  border-style: solid;
  border-radius: 50px;
  position: absolute;
  z-index: 9999;
`;
export const Icone = styled.TouchableOpacity`
  height: 52;
  width: 9;
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

export const ContainerCard = styled(RectButton)`
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 1;
  background: #f9f9f9;
  border-bottom-color: #000;

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
  width: 55px;
  height: 55px;
  border-color: #f4a460;
  border-width: 2;
  border-radius: 50px;
`;

export const Info = styled.View`
  margin-left: 10px;
`;

export const Name = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;
