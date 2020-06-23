/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { format, parseISO, formatDistanceStrict } from 'date-fns';
import pt from 'date-fns/locale/pt';
// Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { dateLanguage } from '../../../locales';
import { formatPrice } from '../../../util/format';
import translate from '../../../locales';

import OrderListPlaceholder from '../../../components/Placeholders/OrderList';

import api from '../../../services/api';

import Background from '../../../components/Background';

import {
  Containerr,
  Content,
  Headerr,
  Title,
  Footer,
  FooterItem,
  Small,
  SubTitle,
  Button,
  ButtonText,
} from './styles';
import {
  Container,
  Header,
  Input,
  Item,
  Text,
  Left,
  Right,
  Body,
  Thumbnail,
  List,
  ListItem,
  Separator,
  CardItem,
  Card,
  Accordion,
  FooterTab,
  Badge,
} from 'native-base';
import colors from '../../../styles/colors';

export default function Orders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [date] = useState(new Date());
  const id = useSelector(state => state.user.profile.id);

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get(`orders_user/${id}`);

      setOrders(
        response.data.map(order => ({
          ...order,
          dateFormatted: format(parseISO(order.date), 'PPPpp', {
            locale: dateLanguage,
          }),
          timeDistance: formatDistanceStrict(parseISO(order.date), new Date(), {
            addSuffix: true,
            locale: pt,
          }),
        })),
      );
    }

    loadOrders();
  }, [date, id]);

  return (
    <Background>
      <Header span style={{ backgroundColor: '#F4A460', height: 60 }}>
        <Text
          style={{
            color: '#fff',
            fontFamily: 'CerebriSans-ExtraBold',
            fontSize: 20,
            alignSelf: 'center',
          }}>
          Detalhes do pedido
        </Text>
      </Header>
      <ScrollView>
        {orders.map(item => (
          <Containerr
            style={{
              elevation: 4,
            }}>
            <Content>
              <Headerr>
                <Thumbnail
                  source={{
                    uri: item.estabelecimento.image.url.replace(
                      'localhost',
                      '10.0.0.104',
                    ),
                  }}
                />

                <Title>{item.estabelecimento.name_loja}</Title>
                <Right>
                  <Title>Valor</Title>
                  <Text>{formatPrice(item.total)}</Text>
                </Right>
              </Headerr>
            </Content>
            <Footer>
              <FooterItem>
                <Small>Tempo</Small>
                <SubTitle>{item.timeDistance}</SubTitle>
              </FooterItem>

              <FooterItem>
                <Small>Status</Small>
                <SubTitle>{item.status}</SubTitle>
              </FooterItem>

              <FooterItem>
                <Button
                  onPress={() =>
                    navigation.navigate('OrdersDetails', { order: item })
                  }>
                  <Small />
                  <ButtonText>Ver detalhes</ButtonText>
                </Button>
              </FooterItem>
            </Footer>
          </Containerr>
        ))}
      </ScrollView>
    </Background>
  );
}
