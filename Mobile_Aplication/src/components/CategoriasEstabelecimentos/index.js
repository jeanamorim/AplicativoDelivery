/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  YellowBox,
} from 'react-native';
import Background from '../../components/Background';
import { ProductList, Product, ImageContainer, ProductTitle } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, Body, CardItem, Thumbnail, View } from 'native-base';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

export default function OfertasPrincipal({ navigation, id, loja }) {
  const [categorias, setCategorias] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  async function getData() {
    if (loading) {
      return;
    }

    setLoading(true);
    const response = await api.get(`categories_estab/${id}?=page${page}`);

    setCategorias([...categorias, ...response.data]);

    setPage(page + 1);

    setLoading(false);
  }
  console.tron.log(total);
  useEffect(() => {
    getData();
  }, []);
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
        contentContainerStyle={{ paddingHorizontal: 2 }}
        data={categorias}
        renderItem={renderCategoria}
        keyExtractor={item => String(item.id)}
        onEndReached={getData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </Background>
  );
}
