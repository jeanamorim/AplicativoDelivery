/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Background from '../../components/Background';
import { ProductList, Product, ImageContainer, ProductTitle } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, Body, CardItem, Thumbnail, View } from 'native-base';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
export default function OfertasPrincipal({ navigation, id, loja }) {
  const [categorias, setCategorias] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;
      return sumAmount;
    }, {}),
  );
  useEffect(() => {
    async function getData() {
      const response = await api.get(`categories_estab/${id}`);

      setCategorias(response.data);
    }

    getData();
  }, [id]);
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  function renderCategoria({ item }) {
    return (
      <Product key={item.id}>
        <ImageContainer
          onPress={() =>
            navigation.navigate('ProductDetails', {
              categoria: item,
              estabelecimento: loja,
            })
          }>
          <Thumbnail
            large
            source={{
              uri: item.image.url.replace('localhost', '10.0.0.104'),
            }}
            style={{ borderColor: '#E25B08', borderWidth: 2 }}
          />
        </ImageContainer>

        <ProductTitle>{item.name}</ProductTitle>
      </Product>
    );
  }

  return (
    <Background>
      <ProductList
        data={categorias}
        extraData={amount}
        keyExtractor={item => String(item.id)}
        renderItem={renderCategoria}
      />
    </Background>
  );
}
