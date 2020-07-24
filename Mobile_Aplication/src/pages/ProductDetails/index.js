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
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Header,
  Input,
  Item,
  Content,
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
  Text,
} from 'native-base';

import {
  ProductList,
  ContainerCard,
  Left,
  Avatar,
  Info,
  Name,
  Time,
  TextBadge,
  Avaliacao,
  TextInfo,
} from './styles';
import api from '../../services/api';
export default function ProductDetails({ navigation, route }) {
  const { categoria, estabelecimento } = route.params;
  const [quantItensCart, setQuantCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const cartSize = useSelector(state => state.cart.length);
  const isFocused = useIsFocused();
  const id = categoria.id;

  async function getProduct() {
    if (loading) {
      return;
    }
    const response = await api.get(`productsCategorias/${id}?page=${page}`);
    setProducts([...products, ...response.data]);
    setPage(page + 1);
    setIsVisible(true);
  }
  useEffect(() => {
    if (isFocused) {
      getProduct();
    }
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
      <ContainerCard
        onPress={() =>
          navigation.navigate('DetalhesItens', {
            produtoDetails: item,
            estabelecimento: estabelecimento,
          })
        }>
        <Left>
          <ShimmerPlaceHolder
            autoRun={true}
            visible={isVisible}
            style={{ width: 70, height: 70 }}>
            <Avatar
              source={{
                uri: item.image.url,
              }}
            />
          </ShimmerPlaceHolder>

          <Info>
            <ShimmerPlaceHolder autoRun={true} visible={isVisible}>
              <Name>{item.name}</Name>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder
              autoRun={true}
              visible={isVisible}
              style={{ marginTop: 4 }}>
              <Time> {item.description}</Time>
            </ShimmerPlaceHolder>
          </Info>
        </Left>
        <ShimmerPlaceHolder
          autoRun={true}
          visible={isVisible}
          style={{ width: 80 }}>
          <TextInfo style={styles.price}>{formatPrice(item.price)}</TextInfo>
        </ShimmerPlaceHolder>
      </ContainerCard>
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

      <Button
        style={styles.buttonCart}
        onPress={() =>
          navigation.navigate('Cart', {
            id: estabelecimento.id,
            product: estabelecimento,
          })
        }>
        <Iconn style={styles.iconCart} name="basket" color="#FFF" size={33} />
        {loading ? (
          <ActivityIndicator
            color="#f00"
            size={25}
            style={{ top: 20, right: 9 }}
          />
        ) : (
          <Badge style={{ marginLeft: -10, marginTop: 30 }}>
            <Text>{cartSize || 0}</Text>
          </Badge>
        )}
      </Button>
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
  buttonCart: {
    height: 65,
    width: 65,
    borderRadius: 70,
    borderWidth: 1,
    backgroundColor: '#F4A460',
    borderColor: '#F4A460',
    position: 'absolute',
    zIndex: 9999,
    flex: 1,

    left: 0,
    right: 0,
    bottom: 20,
  },
  iconCart: {
    marginLeft: 15,
    marginTop: -2,
  },
});
