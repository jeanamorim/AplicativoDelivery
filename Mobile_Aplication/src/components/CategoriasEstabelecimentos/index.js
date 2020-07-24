/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';

import {
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  YellowBox,
} from 'react-native';
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
import { Card } from 'native-base';
import Background from '../../components/Background';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, Body, CardItem, Thumbnail, View } from 'native-base';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export default function OfertasPrincipal({ navigation, id, loja }) {
  const [categorias, setCategorias] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  async function loadCategorias() {
    if (loading) {
      return;
    }
    const response = await api.get(`categories_estab/${id}?page=${page}`);

    setCategorias([...categorias, ...response.data]);

    setPage(page + 1);
  }

  useEffect(() => {
    loadCategorias();
  }, []);
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 20);
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
      <Card style={{ borderRadius: 5 }}>
        <ContainerCard
          onPress={() =>
            navigation.navigate('ProductDetails', {
              categoria: item,
              estabelecimento: loja,
            })
          }>
          <Left>
            <Avatar
              source={{
                uri: item.image.url.replace('localhost', '10.0.0.106'),
              }}
            />
            <Info>
              <Name>{item.name}</Name>
            </Info>
          </Left>
        </ContainerCard>
      </Card>
    );
  }

  return (
    <Background>
      <ProductList
        contentContainerStyle={{ paddingHorizontal: 5 }}
        data={categorias}
        renderItem={renderCategoria}
        keyExtractor={item => String(item.id)}
        onEndReached={loadCategorias}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </Background>
  );
}
