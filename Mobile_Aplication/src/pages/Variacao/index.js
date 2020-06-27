/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { Alert, View, ActivityIndicator } from 'react-native';

import { YellowBox, ScrollView, Image } from 'react-native';
YellowBox.ignoreWarnings(['VirtualizedLists']);
// import { CheckBox } from 'react-native-elements';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import CheckBox from '@react-native-community/checkbox';
import Background from '../../components/Background';

import {
  Button,
  Container,
  Header,
  Text,
  Body,
  List,
  ListItem,
  Footer,
  FooterTab,
} from 'native-base';

export default function ProductsLojas({ navigation, route }) {
  const [variacao, setVariacao] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const { variacoes, produto } = route.params;
  const [valor, setValor] = useState([]);

  const id = variacoes.id;

  const total = formatPrice(
    valor.reduce((totalSum, product) => {
      return totalSum + product.price;
    }, 0),
  );
  console.tron.log(total);
  useEffect(() => {
    async function getData() {
      const response = await api.get(`opcao_variacao/${id}`);

      setVariacao(response.data);
    }
    getData();
  }, [id]);
  ///adiciona a opção no array
  function onChance(item) {
    console.tron.log('caiu');
    let index = valor.indexOf(item);

    if (index > -1) {
      valor.splice(index, 1);
      setToggleCheckBox({ toggleCheckBox: false });
      return;
    }
    setValor([...valor, item]);
    setToggleCheckBox({ toggleCheckBox: true });
  }
  console.tron.log(valor);
  return (
    <Background>
      <Container style={{ flex: 1 }}>
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
              <CheckBox
                onCheckColor={'#F4A460'}
                value={valor.includes(item.id)}
                onValueChange={() => onChance(item)}
              />
            </ListItem>
          ))}
        </List>
      </Container>

      <Footer>
        <FooterTab style={{ backgroundColor: '#F4A460' }}>
          <Button
            onPress={() =>
              navigation.navigate('DetalhesItens', { valor: valor })
            }>
            <Text style={{ fontSize: 15, color: '#fff' }}>Concluir</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Background>
  );
}
