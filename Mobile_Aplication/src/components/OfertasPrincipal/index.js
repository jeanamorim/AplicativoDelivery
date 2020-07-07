/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import Background from '../../components/Background';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, Body, CardItem, Thumbnail } from 'native-base';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

export default function OfertasPrincipal({ navigation }) {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    async function loadOffers() {
      const response = await api.get('offers');

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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.ofertas}>
        {offers.map(oferta => (
          <Body key={oferta.id}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductsLojas')}>
              <CardItem cardBody>
                <Thumbnail
                  square
                  large
                  source={{
                    uri: oferta.product.image.url.replace(
                      'localhost',
                      '10.0.0.104',
                    ),
                  }}
                  style={styles.off}
                />
              </CardItem>
            </TouchableOpacity>

            <Text>
              <Text
                note
                style={{
                  textDecorationLine: 'line-through',
                  textDecorationStyle: 'solid',
                  fontFamily: 'CerebriSans-Regular',
                }}>
                {formatPrice(oferta.from)}
              </Text>
              <Text
                note
                style={{
                  color: '#FF0000',
                  fontFamily: 'CerebriSans-Regular',
                }}>
                {formatPrice(oferta.to)}
              </Text>
            </Text>
            <Text
              note
              style={{
                color: '#F4A460',
                fontFamily: 'CerebriSans-Regular',
              }}>
              {oferta.product.name}
            </Text>
          </Body>
        ))}
      </ScrollView>
    </Background>
  );
}
