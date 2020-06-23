/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import Background from '../../components/Background';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import { addToCartRequest } from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
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
export default function ProductDetails({ navigation }) {
  const productDetails = navigation.getParam('categoria');
  const id_loja = navigation.getParam('id_loja');
  const [products, setProducts] = useState([]);
  const cartSize = useSelector(state => state.cart.length);
  const id = productDetails.id;

  useEffect(() => {
    async function getData() {
      const response = await api.get(`products_estab/${id}`);
      console.tron.log(response.data);
      setProducts(response.data);
    }
    getData();
  }, [id]);

  function RenderProdutos() {
    if (products) {
      if (products.length) {
        return (
          <ScrollView>
            <Card>
              <List>
                {products.map(produtos => (
                  <ListItem
                    key={produtos.id}
                    avatar
                    onPress={() =>
                      navigation.navigate('DetalhesItens', {
                        produtoDetails: produtos,
                        id_estabelecimento: id_loja,
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
                ))}
              </List>
            </Card>
          </ScrollView>
        );
      }

      return (
        <ActivityIndicator
          style={{ marginTop: 200 }}
          size={50}
          color="#F4A460"
        />
      );
    }

    return null;
  }

  return (
    <Background>
      <Container>
        <Header style={{ backgroundColor: '#F4A460', height: 50 }}>
          <Left>
            <Button transparent>
              <Icon
                color="#fff"
                size={25}
                name="arrow-back"
                onPress={() => navigation.navigate('ProductsLojas')}
              />
            </Button>
          </Left>
          <Body>
            <Text
              style={{
                marginLeft: 33,
                marginTop: 4,
                color: '#fff',
                fontFamily: 'CerebriSans-ExtraBold',
                fontSize: 20,
              }}>
              {productDetails.name}
            </Text>
          </Body>
        </Header>

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
