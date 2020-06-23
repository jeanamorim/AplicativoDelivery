import styled from 'styled-components/native';
import { BaseButton } from 'react-native-gesture-handler';
import { darken } from 'polished';
import Swiper from 'react-native-swiper';
import colors from '../../styles/colors';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
`;

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const ImageSlide = styled(Swiper).attrs({
  autoplay: true,
  showsPagination: false,
  showsButtons: false,
  height: 220,
})``;

export const Banner = styled.Image`
  flex: 1;
  width: 100%;
`;

export const ListContainer = styled.View`
  padding: 0 5px;
  flex: 1;
`;

export const CategoriesHeaderText = styled.Text`
  margin: 10px 0 5px;
  font-size: 18px;
  font-weight: bold;
  color: ${colors.black};
`;

export const CategoryList = styled.FlatList.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Category = styled.View`
  align-self: stretch;
  align-items: center;
  margin: 5px;
`;

export const CategoryImageContainer = styled(BaseButton)`
  background: ${colors.primary};
  height: 84px;
  width: 84px;
  border-radius: 42px;
  align-items: center;
  justify-content: center;
`;

export const CategoryImage = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 40px;
`;

export const CategoryName = styled.Text``;

export const ProductsHeaderText = styled.Text`
  margin: 10px 0 5px;
  font-size: 18px;
  font-weight: bold;
  color: ${colors.black};
`;

export const ProductList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 3,
})``;

export const Product = styled.View`
  background: ${colors.white};
  border-radius: 4px;
  padding: 10px;
  flex: 0.5;
  align-items: center;
  margin: 3px;
`;

export const ImageContainer = styled.TouchableOpacity``;

export const ProductImage = styled.Image.attrs({ resizeMode: 'contain' })`
  width: 140;
  height: 140;
  margin-bottom: 5px;
  border-radius: 50px;
`;

export const ProductTitle = styled.Text`
  margin: 5px 0;
  font-size: 10px;
  font-size: 11;
  font-family: 'CerebriSans-Regular';
`;

export const ProductInfoContainer = styled.View`
  align-self: stretch;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 8px;
`;

export const ProductUnit = styled.Text`
  color: ${colors.black};
`;

export const ProductPrice = styled.Text`
  color: ${colors.red};
`;

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
