/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import Background from '../../components/Background';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, Body, CardItem, Thumbnail, View } from 'native-base';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

export default function OfertasEstabelecimentos({ navigation, id }) {
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    async function loadOffers() {
      const response = await api.get(`offer_estab/${id}`);
      console.tron.log(response.data);
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
  }, [id]);

  function RenderOfertas() {
    if (offers) {
      if (offers.length) {
        return (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.ofertas}>
            {offers.map(oferta => (
              <Body key={oferta.id}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetails', {
                      categoria: oferta,
                    })
                  }>
                  <CardItem cardBody>
                    <Thumbnail
                      square
                      large
                      source={{
                        uri: oferta.product.image.url.replace(
                          'localhost',
                          '10.0.0.106',
                        ),
                      }}
                      style={styles.off}
                    />
                  </CardItem>
                  <Text>
                    <Text
                      note
                      style={{
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                        fontFamily: 'CerebriSans-ExtraBold',
                      }}>
                      {formatPrice(oferta.from)}
                    </Text>
                    <Text
                      note
                      style={{
                        color: '#FF0000',
                        fontFamily: 'CerebriSans-ExtraBold',
                      }}>
                      {formatPrice(oferta.to)}
                    </Text>
                  </Text>
                  <Text
                    note
                    style={{
                      color: '#F4A460',
                      fontFamily: 'CerebriSans-ExtraBold',
                    }}>
                    {oferta.product.name}
                  </Text>
                </TouchableOpacity>
              </Body>
            ))}
          </ScrollView>
        );
      }

      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'CerebriSans-ExtraBold',
              color: '#F4A460',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Estabelecimento sem ofertas.
          </Text>
        </View>
      );
    }

    return null;
  }
  return (
    <Background>
      <RenderOfertas />
    </Background>
  );
}
