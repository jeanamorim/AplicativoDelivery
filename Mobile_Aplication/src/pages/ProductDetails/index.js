/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View, ActivityIndicator, StyleSheet } from 'react-native';
import Background from '../../components/Background';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import { addToCartRequest } from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { withNavigationFocus } from 'react-navigation';
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
import { ProductList } from './styles';
import api from '../../services/api';
export default function ProductDetails({ navigation, route }) {
  const { categoria, estabelecimento } = route.params;
  const [quantItensCart, setQuantCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const id = categoria.id;
  //total de itens no carrinho

  useFocusEffect(() => {
    async function getData() {
      const response = await api.get(`cart/${estabelecimento.id}`);
      setQuantCart(response.headers['x-total-count']);
    }
    getData();
  }, []);
  async function getProduct() {
    if (loading) {
      return;
    }

    const response = await api.get(`productsCategorias/${id}?page=${page}`);

    setProducts([...products, ...response.data]);
    setPage(page + 1);
  }
  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  function renderFooter() {
    if (loading) {
      return null;
    }
    return (
      <View style={{ alignSelf: 'center', marginVertical: 20 }}>
        <ActivityIndicator size={35} color="#F4A460" />
      </View>
    );
  }

  function RenderProdutos({ item }) {
    return (
      <Card>
        <List>
          <ShimmerPlaceHolder
            key={item.id}
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
                  produtoDetails: item,
                  estabelecimento: estabelecimento,
                })
              }>
              <Left>
                <Thumbnail
                  square
                  source={{
                    uri: item.image.url.replace('localhost', '10.0.0.104'),
                  }}
                  style={{
                    height: 64,
                    width: 64,
                    marginTop: -10,
                    marginLeft: -8,
                  }}
                />
              </Left>
              <Body>
                <Text
                  numberOfLines={1}
                  style={{ fontFamily: 'CerebriSans-Regular' }}>
                  {item.name}
                </Text>
                <Text
                  note
                  numberOfLines={2}
                  style={{ fontFamily: 'CerebriSans-Regular' }}>
                  {item.description}
                </Text>
              </Body>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
            </ListItem>
          </ShimmerPlaceHolder>
        </List>
      </Card>
    );
  }

  return (
    <Background>
      <Container>
        <ProductList
          style={{ marginTop: 10 }}
          contentContainerStyle={{ paddingHorizontal: 2 }}
          data={products}
          renderItem={RenderProdutos}
          keyExtractor={item => String(item.id)}
          onEndReached={getProduct}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
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
              onPress={() => navigation.goBack()}
            />
          </Button>
          <Button
            badge
            vertical
            onPress={() =>
              navigation.navigate('Cart', {
                id: estabelecimento.id,
              })
            }>
            {loading ? (
              <ActivityIndicator size={20} color="#000" />
            ) : (
              <Badge>
                <Text>{quantItensCart || 0}</Text>
              </Badge>
            )}

            <Icon name="basket" style={{ color: '#fff' }} />
          </Button>
        </FooterTab>
      </Footer>
    </Background>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  price: {
    height: 40,
    padding: 10,
    color: '#20B402',
    fontFamily: 'CerebriSans-Regular',
  },
});
