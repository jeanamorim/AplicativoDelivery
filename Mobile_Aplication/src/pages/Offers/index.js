/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Background from '../../components/Background';
import styles from './styles';
import { addToCartRequest } from '../../store/modules/cart/actions';
import api from '../../services/api';
import { parseISO } from 'date-fns';
import Timer from '../../components/Timer';
import translate from '../../locales';
import ProductListPlaceholder from '../../components/Placeholders/ProductList';
import { formatPrice } from '../../util/format';
import {
  Container,
  Button,
  Header,
  Input,
  Item,
  Text,
  Content,
  Left,
  Right,
  Body,
  Title,
  CardItem,
  Thumbnail,
} from 'native-base';
import {
  ListContainer,
  ProductList,
  Product,
  ImageContainer,
  ProductImage,
  ProductTitle,
  ProductInfoContainer,
  ProductUnit,
  PriceContainer,
  FromPrice,
  ToPrice,
  AddButton,
  ProductAmount,
  ProductAmountText,
  AddButtonText,
  NoOffers,
  AnimationContainer,
  EmptyBoxAnimation,
  NoOffersTextContainer,
  NoOffersText,
  NoOffersSubText,
} from './style';

export default function Offers({ navigation }) {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadOffers() {
      const response = await api.get('offers');
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
  }, []);

  return (
    <Background>
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => navigation.navigate('Home')}>
              <Icon active name="angle-left" size={23} color="#fff" />
            </Button>
          </Left>
          <Body style={styles.titulo}>
            <Title>Ofertas</Title>
          </Body>
        </Header>
        <Header searchBar rounded style={styles.pesquisar}>
          <Item>
            <Input placeholder="Buscar ofertas" style={styles.input} />
            <Button rounded style={styles.lupa}>
              <Icon name="search" size={25} color="#F4A460" />
            </Button>
          </Item>
        </Header>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.ofertas}>
          {offers.map(oferta => (
            <Body>
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
                  }}>
                  {formatPrice(oferta.from)}
                </Text>
                <Text note style={{ color: '#FF0000' }}>
                  {formatPrice(oferta.to)}
                </Text>
              </Text>
              <Text note style={{ color: '#F4A460' }}>
                {oferta.product.name}
              </Text>
            </Body>
          ))}
        </ScrollView>
      </Container>
    </Background>
  );
}
Offers.navigationOptions = {
  tabBarLabel: 'Ofertas',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="percentage" size={20} color={tintColor} />
  ),
};
