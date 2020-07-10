/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [date] = useState(new Date());
  const [total, setTotal] = useState(0);
  const id = useSelector(state => state.user.profile.id);

  async function loadOrders() {
    if (loading) {
      return;
    }
    if (total > 0 && orders.length === total) {
      return;
    }
    setLoading(true);
    const response = await api.get(`orders_user/${id}?page=${page}`);

    setOrders([
      ...orders,
      ...response.data.map(order => ({
        ...order,
        dateFormatted: format(parseISO(order.date), 'PPPpp', {
          locale: dateLanguage,
        }),
        timeDistance: formatDistanceStrict(parseISO(order.date), new Date(), {
          addSuffix: true,
          locale: pt,
        }),
      })),
    ]);
    setTotal(response.headers['X-Total-Count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
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
  function renderItem({ item }) {
    return (
      <Containerr
        key={item.id}
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
    );
  }
  return (
    <Background>
      <FlatList
        style={{ marginTop: 2 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        onEndReached={loadOrders}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </Background>
  );
}
