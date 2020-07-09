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
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
export default function OfertasEstabelecimentos({ navigation, id }) {
  const [offers, setOffers] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
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
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  function RenderOfertas() {
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
              <ShimmerPlaceHolder
                style={{
                  maxWidth: 110,
                  height: 110,
                  width: 110,
                  flex: 1,
                  marginRight: 5,
                  borderColor: '#fff',
                  borderWidth: 1,

                  borderRadius: 6,
                }}
                autoRun={true}
                visible={isVisible}>
                <CardItem>
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
              </ShimmerPlaceHolder>
              <ShimmerPlaceHolder
                style={{
                  height: 12,
                  margin: 7,
                  width: 128,
                }}
                autoRun={true}
                visible={isVisible}>
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
              </ShimmerPlaceHolder>
              <ShimmerPlaceHolder
                style={{
                  height: 12,
                  margin: 7,
                  width: 128,
                }}
                autoRun={true}
                visible={isVisible}>
                <Text
                  note
                  style={{
                    color: '#F4A460',
                    fontFamily: 'CerebriSans-ExtraBold',
                  }}>
                  {oferta.product.name}
                </Text>
              </ShimmerPlaceHolder>
            </TouchableOpacity>
          </Body>
        ))}
      </ScrollView>
    );
  }

  return (
    <Background>
      <RenderOfertas />
    </Background>
  );
}
