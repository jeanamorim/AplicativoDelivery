/* eslint-disable no-labels */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import { YellowBox, ScrollView, Image } from 'react-native';
YellowBox.ignoreWarnings(['VirtualizedLists']);
import Icons from 'react-native-vector-icons/FontAwesome5';

import api from '../../services/api';
import { formatPrice } from '../../util/format';

import Background from '../../components/Background';

import styles from './style';

import {
  Button,
  Container,
  Header,
  Input,
  Item,
  Text,
  Content,
  Left,
  Right,
  Body,
  Thumbnail,
  List,
  ListItem,
  Separator,
  CardItem,
  Card,
  Icon,
  Accordion,
  Toast,
  Fab,
  Footer,
  FooterTab,
  CheckBox,
} from 'native-base';
import * as CartActions from '../../store/modules/cart/actions';

export default function ProductsLojas({ navigation }) {
  const [variacao, setVariacao] = useState([]);
  const variacoes = navigation.getParam('variacao');
  const produto = navigation.getParam('produto');
  console.tron.log(produto);
  const [categorias, setCategorias] = useState([]);
  const [offers, setOffers] = useState([]);
  const id = variacoes.id;
  const cartSize = useSelector(state => state.cart.length);
  const dispatch = useDispatch();
  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;
      return sumAmount;
    }, {}),
  );

  useEffect(() => {
    async function getData() {
      const response = await api.get(`opcao_variacao/${id}`);
      console.tron.log(response.data);
      setVariacao(response.data);
    }
    getData();
  }, [id]);

  //  { text: 'Sim', onPress: () => dispatch(CartActions.EsvaziarCart()) },
  return (
    <Background>
      <Container style={{ flex: 1 }}>
        <Header span style={{ backgroundColor: '#F4A460', height: 60 }}>
          <Right style={{ marginRight: 20, marginTop: 5 }}>
            <Button transparent>
              <Iconn
                name="close"
                color="#FFF"
                size={26}
                onPress={() => navigation.goBack()}
              />
            </Button>
          </Right>
        </Header>

        <Header style={{ backgroundColor: '#F4A460', height: 50 }}>
          <Text
            style={{
              marginTop: -5,
              color: '#fff',
              fontFamily: 'CerebriSans-ExtraBold',
              fontSize: 20,
            }}>
            {produto.name}
          </Text>
        </Header>
        <List style={{ marginLeft: -20 }}>
          <ListItem>
            <Body>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'CerebriSans-ExtraBold',
                  color: '#F4A460',
                  textTransform: 'uppercase',
                }}>
                {variacoes.name}
              </Text>
              <Text
                note
                style={{
                  fontFamily: 'CerebriSans-ExtraBold',
                  color: '#999',
                  fontSize: 9,
                }}>
                No mínimo {variacoes.minimo}. No máximo {variacoes.maximo}
              </Text>
            </Body>
          </ListItem>
          {variacao.map(item => (
            <ListItem key={item.id}>
              <Body>
                <Text
                  style={{
                    fontFamily: 'CerebriSans-ExtraBold',
                  }}>
                  {item.name}
                </Text>
              </Body>
              <Text
                style={{
                  fontFamily: 'CerebriSans-ExtraBold',
                  color: '#20B402',
                }}>
                +{formatPrice(item.price)}
              </Text>
              <CheckBox color="orange" style={{ marginLeft: 10 }} />
            </ListItem>
          ))}
        </List>
      </Container>
      <Footer>
        <FooterTab style={{ backgroundColor: '#F4A460' }}>
          <Button>
            <Text style={{ fontSize: 15, color: '#fff' }}>Concluir</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Background>
  );
}

ProductsLojas.navigationOptions = ({ navigation }) => ({
  headerTitle: () => <View />,
});
