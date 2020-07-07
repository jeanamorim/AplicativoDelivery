/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import Background from '../../components/Background';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import { addToCartRequest } from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {
  Button,
  Container,
  Header,
  Input,
  Item,
  Text,
  Content,
  Left,
  Right,
  Body,
  Thumbnail,
  List,
  ListItem,
  Separator,
  CardItem,
  Card,
  Icon,
  Accordion,
  FooterTab,
  Footer,
  Badge,
} from 'native-base';
import styles from './styles';
import api from '../../services/api';
export default function ProductDetails({ navigation, route }) {
  const { categoria, estabelecimento } = route.params;
  console.tron.log(estabelecimento);
  const [products, setProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const totalCart = useSelector(state => state.cart);
  const id = categoria.id;
  //total de itens no carrinho
  const cartSize = totalCart.reduce((totalSum, product) => {
    return totalSum + product.amount;
  }, 0);

  useEffect(() => {
    async function getData() {
      const response = await api.get(`productsCategorias/${id}`);
      console.tron.log(response.data);
      setProducts(response.data);
    }
    getData();
  }, [id]);
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  function RenderProdutos() {
    return (
      <ScrollView>
        <Card>
          <List>
            {products.map(produtos => (
              <ShimmerPlaceHolder
                key={produtos.id}
                style={{
                  height: 65,
                  margin: 7,
                  width: '97%',
                }}
                autoRun={true}
                visible={isVisible}>
                <ListItem
                  avatar
                  onPress={() =>
                    navigation.navigate('DetalhesItens', {
                      produtoDetails: produtos,
                      estabelecimento: estabelecimento,
                    })
                  }>
                  <Left>
                    <Thumbnail
                      square
                      source={{
                        uri: produtos.image.url.replace(
                          'localhost',
                          '10.0.0.106',
                        ),
                      }}
                      style={{ height: 64, width: 64 }}
                    />
                  </Left>
                  <Body>
                    <Text
                      numberOfLines={1}
                      style={{ fontFamily: 'CerebriSans-Regular' }}>
                      {produtos.name}
                    </Text>
                    <Text
                      note
                      numberOfLines={2}
                      style={{ fontFamily: 'CerebriSans-Regular' }}>
                      {produtos.description}
                    </Text>
                  </Body>
                  <Text style={styles.price}>
                    {formatPrice(produtos.price)}
                  </Text>
                </ListItem>
              </ShimmerPlaceHolder>
            ))}
          </List>
        </Card>
      </ScrollView>
    );
  }

  return (
    <Background>
      <Container>
        <RenderProdutos />
      </Container>

      <Footer>
        <FooterTab style={{ backgroundColor: '#F4A460' }}>
          <Button>
            <Icon
              name="home"
              style={{ color: '#fff' }}
              onPress={() => navigation.navigate('Home')}
            />
          </Button>

          <Button vertical>
            <Icon
              style={{ color: '#fff' }}
              name="arrow-back"
              onPress={() => navigation.navigate('ProductsLojas')}
            />
          </Button>
          <Button badge vertical onPress={() => navigation.navigate('Cart')}>
            <Badge>
              <Text>{cartSize || 0}</Text>
            </Badge>
            <Icon name="basket" style={{ color: '#fff' }} />
          </Button>
        </FooterTab>
      </Footer>
    </Background>
  );
}
ProductDetails.navigationOptions = ({ navigation }) => ({
  title: 'Categorias',
});
