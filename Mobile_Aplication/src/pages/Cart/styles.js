import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import { RectButton } from 'react-native-gesture-handler';
import watermelon from '../../assets/animations/watermelon.json';
import colors from '../../styles/colors.js';

export const CartContainer = styled.SafeAreaView`
  flex: 1;
`;

export const MainContainer = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 6 },
})``;

export const Products = styled.View``;

export const Product = styled.View`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 4px;
  margin-bottom: 5px;
`;

export const ProductDetails = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 27px;
`;

export const ProductImage = styled.Image`
  width: 80px;
  height: 80px;
  border-color: #999;
  border-width: 1;
  border-radius: 10px;
  margin-left: -7%;
`;

export const ProductOpcao = styled.View`
  display: flex;
`;

export const ProductInfo = styled.View`
  margin-left: 5px;
`;
export const TextOpcao = styled.Text`
  margin-left: 10px;
`;
export const CampoObservacao = styled.View`
  margin-left: 5px;
  background: #eecbad;
`;

export const ProductTitle = styled.Text`
  font-weight: bold;
`;
export const TextObservacao = styled.Text`
  color: #fff;
`;

export const ProductWeight = styled.Text`
  font-weight: bold;
`;

export const ProductRemoveButton = styled.TouchableOpacity``;

export const ProductControls = styled.View`
  background: #fff5ee;
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;

export const ProductControlButton = styled.TouchableOpacity``;

export const ProductAmount = styled.TextInput.attrs({ editable: false })`
  min-width: 52px;
  background: ${colors.white};
  border-radius: 4px;
  padding: 5px;
  border: 1px solid ${colors.border};
  margin: 0 5px;
`;

export const ProductSubTotal = styled.Text`
  font-weight: bold;
  font-size: 16px;
  flex: 1;
  text-align: right;
  padding: 0px;
`;
export const ProductPrice = styled.Text`
  font-size: 14px;
  flex: 1;
  text-align: right;
  padding: 0px;
`;

export const DetailsContainer = styled.View`
  padding: 2px;
  background: #fff;
`;
export const DetailsContainerSub = styled.View`
  padding: 2px;
  background: #eecbad;
`;

export const SubtotalOpcao = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const Subtotal = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const SubtotalLabel = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #000;
`;

export const SubTotalValue = styled.Text`
  font-size: 15px;

  color: #000;
`;

export const DeliveryCharges = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const DeliveryChargesLabel = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${colors.red};
`;

export const DeliveryChargesValue = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${colors.red};
`;

export const GrandTotal = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const GrandTotalLabel = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${colors.white};
`;

export const GrandTotalValue = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${colors.white};
`;

export const CartFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 55px;
  background: ${colors.primary};
  padding: 10px;
`;

export const ConfirmOrderText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${colors.white};
`;

export const ViewDetailsButton = styled.TouchableOpacity`
  position: absolute;
  left: 50%;
`;

export const TotalContainer = styled.View`
  flex-direction: row;
`;

export const Total = styled.Text`
  font-size: 15px;
  margin-right: 5px;
  font-weight: bold;
  color: ${colors.white};
`;

export const EmptyCart = styled.View`
  height: 70%;
  align-items: center;
  justify-content: center;
`;

export const WatermelonAnimation = styled(LottieView).attrs({
  resizeMode: 'cover',
  source: watermelon,
  autoPlay: true,
  loop: false,
})``;

export const EmptyCartTextContainer = styled.View`
  align-items: center;
  margin-top: 200px;
`;

export const EmptyCartText = styled.Text`
  font-size: 20px;
  font-family: 'CerebriSans-ExtraBold';
`;

export const EmptyCartSubText = styled.Text`
  font-size: 14px;
  font-family: 'CerebriSans-Regular';
`;
export const ButtonAdd = styled(RectButton)`
  elevation: 8;

  padding: 6px;

  width: 100%;
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
`;
export const CartTotalLabel = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin: 7px;
`;

export const CartTotalValue = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin: 7px;
  margin-left: 50%;
`;
