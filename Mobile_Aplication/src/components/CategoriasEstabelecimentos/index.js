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

export default function OfertasPrincipal({ navigation, id }) {
  const [categorias, setCategorias] = useState([]);

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

  function renderCategoria({ item }) {
    return (
      <Product key={item.id}>
        <ImageContainer
          onPress={() =>
            navigation.navigate('ProductDetails', {
              categoria: item,
              id_loja: id,
            })
          }>
          <Thumbnail
            large
            source={{
              uri: item.image.url.replace('localhost', '10.0.0.106'),
            }}
            style={{ borderColor: '#F4A460', borderWidth: 2 }}
          />
        </ImageContainer>
        <ProductTitle>{item.name}</ProductTitle>
      </Product>
    );
  }

  return (
    <Background>
      {categorias.length ? (
        <ProductList
          data={categorias}
          extraData={amount}
          keyExtractor={item => String(item.id)}
          renderItem={renderCategoria}
        />
      ) : (
        <ActivityIndicator size={50} color="#F4A460" />
      )}
    </Background>
  );
}
