import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';

import watermelon from '../../assets/animations/watermelon.json';

export const Container = styled.View`
  flex: 1;
  border-radius: 2px;
`;

export const ProductList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  background: #fff;
  border-radius: 2px;
  padding: 5px;
`;

export const ProductContainer = styled.View`
  flex-direction: column;
  background: #e8e8e8;
`;

export const Product = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const ProductInfo = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  margin-left: 1px;
  margin: auto;
`;
export const ProductInfoValor = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  margin-left: 130px;
`;
export const Title = styled.Text`
  height: 20px;
  width: 520px;
`;

export const Value = styled.Text`
  font-size: 15px;
  color: #222;
`;

export const CartItemSubTotal = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 10px 5px;
`;

export const CartItemCount = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const RemoveCart = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Amount = styled.Text`
  margin: 0 10px;
`;

export const CartItemTotalValue = styled.Text`
  color: #f4a460;
  font-size: 18px;
  font-weight: bold;
`;

export const CartTotal = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 55px;
  width: 290px;
  margin: -3px 25px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const CartTotalLabel = styled.Text`
  font-size: 20px;
  color: #f4a460;
`;

export const CartTotalValue = styled.Text`
  font-size: 20px;
  color: #222;
  font-weight: bold;
`;
export const CheckoutButton = styled(RectButton)`
  background: #f4a460;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px;
  color: #fff;
  border-radius: 4px;
  margin: 2px;
`;

export const EmptyCartContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyCart = styled.View`
  background: #fff;
  flex-direction: column;
  align-items: center;
`;

export const EmptyCartMessage = styled.Text`
  margin: 15px 0;
  color: #222;
  font-size: 16px;
  font-weight: bold;
`;

export const BackHomeButton = styled(RectButton)`
  background: #f4a460;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px;
  color: #fff;
  border-radius: 4px;
  margin: 2px;
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
export const EsvaziarCart = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 260px;
  width: 290px;
  margin: -3px 25px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ObservacaoProducto = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f7d3b0;
`;
export const TextoObs = styled.Text`
  font-size: 14px;
  font-family: 'CerebriSans-Regular';
`;
