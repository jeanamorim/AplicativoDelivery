/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
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
  ProductList,
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
  const [isVisible, setIsVisible] = useState(false);
  const id = useSelector(state => state.user.profile.id);

  async function loadOrders() {
    if (loading) {
      return;
    }
    if (total > 0 && orders.length === total) {
      return;
    }

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
  }

  useEffect(() => {
    loadOrders();
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
  function renderItem({ item }) {
    return (
      <Containerr>
        <Content
          key={item.id}
          style={{
            elevation: 4,
          }}>
          <Headerr>
            <ShimmerPlaceHolder
              autoRun={true}
              visible={isVisible}
              style={{ height: 64, width: 64, borderRadius: 50 }}>
              <Thumbnail
                source={{
                  uri: item.estabelecimento.image.url.replace(
                    'localhost',
                    '10.0.0.104',
                  ),
                }}
              />
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder
              autoRun={true}
              visible={isVisible}
              style={{ marginLeft: 17 }}>
              <Title>{item.estabelecimento.name_loja}</Title>
            </ShimmerPlaceHolder>
            <Right>
              <ShimmerPlaceHolder
                autoRun={true}
                visible={isVisible}
                style={{ width: 50 }}>
                <Title>Valor</Title>
              </ShimmerPlaceHolder>
              <ShimmerPlaceHolder
                autoRun={true}
                visible={isVisible}
                style={{ width: 80, marginTop: 5 }}>
                <Text>{formatPrice(item.total)}</Text>
              </ShimmerPlaceHolder>
            </Right>
          </Headerr>
        </Content>
        <Footer>
          <FooterItem>
            <ShimmerPlaceHolder
              autoRun={true}
              visible={isVisible}
              style={{ width: 100 }}>
              <Small>Tempo</Small>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder
              autoRun={true}
              visible={isVisible}
              style={{ width: 70, marginTop: 2 }}>
              <SubTitle>{item.timeDistance}</SubTitle>
            </ShimmerPlaceHolder>
          </FooterItem>

          <FooterItem>
            <ShimmerPlaceHolder
              autoRun={true}
              visible={isVisible}
              style={{ width: 100 }}>
              <Small>Status</Small>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder
              autoRun={true}
              visible={isVisible}
              style={{ width: 70, marginTop: 2 }}>
              <SubTitle>{item.status}</SubTitle>
            </ShimmerPlaceHolder>
          </FooterItem>

          <FooterItem>
            <Button
              onPress={() =>
                navigation.navigate('OrdersDetails', { order: item })
              }>
              <Small />
              <ShimmerPlaceHolder
                autoRun={true}
                visible={isVisible}
                style={{ width: 80 }}>
                <ButtonText>Ver detalhes</ButtonText>
              </ShimmerPlaceHolder>
            </Button>
          </FooterItem>
        </Footer>
      </Containerr>
    );
  }
  return (
    <Background>
      <ProductList
        style={{ marginTop: 10 }}
        contentContainerStyle={{ paddingHorizontal: 2 }}
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
