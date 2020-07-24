/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Background from '../../components/Background';
import {
  ProductList,
  Container,
  Left,
  Avatar,
  Info,
  Name,
  Time,
  Canceled,
  Avaliacao,
} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, Body, CardItem, Thumbnail } from 'native-base';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

export default function OfertasPrincipal({ navigation }) {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    async function loadOffers() {
      const response = await api.get('offersGeral');

      const data = response.data.map(offer => ({
        ...offer,
        fromFormatted: formatPrice(offer.from),
        toFormatted: formatPrice(offer.to),
        product: {
          ...offer.product,
          priceFormatted: formatPrice(offer.product.price),
        },
      }));
      setOffers(data);
    }

    loadOffers();
  }, []);

  return (
    <Background>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {offers.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              navigation.navigate('ProductsLojas', {
                product: item.estabelecimento,
              })
            }>
            <Container>
              <Left>
                <Avatar
                  source={{
                    uri: item.product.image.url.replace(
                      'localhost',
                      '10.0.0.106',
                    ),
                  }}
                />
              </Left>

              <Info>
                <Name> {item.product.name}</Name>

                <Avaliacao>
                  <Text
                    note
                    style={{
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                    }}>
                    {formatPrice(item.from)}
                  </Text>
                  <Text
                    note
                    style={{
                      color: '#FF0000',
                    }}>
                    {formatPrice(item.to)}
                  </Text>
                </Avaliacao>
              </Info>
            </Container>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Background>
  );
}
