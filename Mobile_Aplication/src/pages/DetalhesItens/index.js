/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import storage from '@react-native-community/async-storage';
import Background from '../../components/Background';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addToCartRequest } from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';

import {
  Container,
  Button,
  Item,
  Text,
  Content,
  Left,
  Right,
  Body,
  List,
  ListItem,
  CardItem,
  Card,
  Form,
  Textarea,
  Footer,
  FooterTab,
} from 'native-base';
import api from '../../services/api';
import CheckBox from '@react-native-community/checkbox';
export default function DetalhesItens({ navigation, route }) {
  const { produtoDetails, estabelecimento } = route.params;
  const [variacao, setVariacao] = useState([]);
  const [quantidade, setQuantidade] = useState(1);

  const [total, setTotal] = useState(produtoDetails.price);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [valor, setValor] = useState([]);
  const status = estabelecimento.status === 'ABERTO' ? true : false;

  const id = produtoDetails.id;

  const dispatch = useDispatch();

  const VarTotal = 0;

  useEffect(() => {
    async function getData() {
      const response = await api.get(`variacao_produto/${id}`);
      setVariacao(response.data);
    }
    getData();
  }, [id]);

  function decrement() {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
    return quantidade;
  }

  function increment() {
    setQuantidade(quantidade + 1);
  }

  const totalOpcao = valor.reduce((totalSum, product) => {
    return totalSum + product.price;
  }, 0);

  const totalItem = total * quantidade;
  const valorTotalPedido = totalItem + totalOpcao;

  function handleAddProduct(product, quantidade) {
    dispatch(addToCartRequest(product, quantidade));
  }
  //metodo verica se existem objetos iguais no array e remove caso tenha
  function onChancet(item) {
    let index = valor.indexOf(val => val.name === item.name);

    if (index > -1) {
      valor.splice(index, 1);
      setToggleCheckBox({ toggleCheckBox: false });
      return;
    }
    setValor([...valor, item]);
    setToggleCheckBox({ toggleCheckBox: true });
  }

  function onChanced(item) {
    var encontrou = false;

    for (var index = 0, total = valor.length; index < total; index++) {
      var obj = valor[index];

      if (obj.name === item) {
        valor.splice(index, 1);
        setToggleCheckBox({ toggleCheckBox: false });
        encontrou = true;
        break;
      }
    }

    if (encontrou === false) {
      setValor([...valor, item]);
      setToggleCheckBox({ toggleCheckBox: true });
    }
  }

  function onChance(id) {
    let index = valor.findIndex(val => val.name === id.name);
    if (index > -1) {
      valor.splice(index, 1);
      setToggleCheckBox({ toggleCheckBox: false });
      return;
    }
    setValor([...valor, id]);
    setToggleCheckBox({ toggleCheckBox: true });
  }

  console.tron.log(valor);
  return (
    <Background>
      <Container>
        <ScrollView>
          <Card
            style={{
              marginTop: 0,
              height: 200,
              width: null,
              flex: 1,
              borderRadius: 20,
            }}>
            <CardItem cardBody>
              <Image
                source={{
                  uri: produtoDetails.image.url.replace(
                    'localhost',
                    '10.0.0.106',
                  ),
                }}
                style={{
                  marginTop: 17,
                  marginLeft: 9,
                  marginRight: 9,
                  height: 200,
                  width: null,
                  flex: 1,
                  borderRadius: 20,
                }}
              />
            </CardItem>
          </Card>

          <Item style={{ marginTop: 40 }}>
            <Left
              style={{
                alignContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'CerebriSans-ExtraBold',
                  alignContent: 'center',
                }}>
                {produtoDetails.name}
              </Text>
              <Text
                note
                style={{
                  fontFamily: 'CerebriSans-ExtraBold',
                }}>
                {produtoDetails.description}
              </Text>
              <Text
                style={{
                  fontFamily: 'CerebriSans-ExtraBold',
                  color: '#20B402',
                  fontSize: 20,
                }}>
                {formatPrice(produtoDetails.price)}
              </Text>
            </Left>
          </Item>

          <Content style={{ marginTop: 20 }}>
            {variacao.map(variacoes => (
              <List style={{ marginLeft: -20 }} key={variacoes.id}>
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
                    {variacoes.opcao.map(op => (
                      <ListItem>
                        <Body>
                          <Text
                            style={{
                              fontFamily: 'CerebriSans-ExtraBold',
                            }}>
                            {op.name}
                          </Text>
                        </Body>
                        <Text
                          style={{
                            fontFamily: 'CerebriSans-ExtraBold',
                            color: '#20B402',
                          }}>
                          +{formatPrice(op.price)}
                        </Text>
                        <CheckBox
                          onCheckColor={'#F4A460'}
                          value={valor.includes(op.id)}
                          onValueChange={() => onChancet(op)}
                        />
                      </ListItem>
                    ))}
                  </Body>
                </ListItem>
              </List>
            ))}
          </Content>
          <Content padder>
            <Form>
              <Textarea
                bordered
                style={{
                  borderRadius: 20,
                  fontFamily: 'CerebriSans-ExtraBold',
                  height: 90,
                }}
                rowSpan={5}
                placeholder="Alguma observação para os itens acima?"
                placeholderTextColor={'#9999'}
              />
            </Form>
          </Content>
        </ScrollView>
      </Container>
      <Item>
        <Content
          style={{
            elevation: 10,
            borderRadius: 15,
            borderColor: '#fff',
            borderWidth: 2,
            marginTop: 2,
          }}>
          <Item>
            <Left style={{}}>
              <Button
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 60,
                  borderColor: '#fff',
                  borderWidth: 2,
                  backgroundColor: '#F4A460',
                }}>
                <Icon
                  color={'#fff'}
                  name="remove"
                  size={25}
                  onPress={decrement}
                />
              </Button>
            </Left>
            <Body>
              <Text style={{ alignItems: 'center', marginLeft: -10 }}>
                {quantidade}
              </Text>
            </Body>
            <Right style={{ marginLeft: -10 }}>
              <Button
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 60,
                  borderColor: '#fff',
                  borderWidth: 2,
                  backgroundColor: '#F4A460',
                }}>
                <Icon name="add" size={25} color={'#fff'} onPress={increment} />
              </Button>
            </Right>
          </Item>
        </Content>

        <Right
          style={{
            marginRight: 0,

            backgroundColor: '#fff',
            borderRadius: 1,
            borderColor: '#fff',
            borderWidth: 2,
          }}>
          <Text style={{ color: '#F4A460', fontSize: 23, alignSelf: 'center' }}>
            {formatPrice(valorTotalPedido)}
          </Text>
        </Right>
      </Item>
      <Footer>
        <FooterTab style={{ backgroundColor: '#F4A460' }}>
          {status === true ? (
            <Button
              onPress={() => {
                handleAddProduct(produtoDetails, quantidade);
                navigation.goBack();
              }}>
              <Text style={{ fontSize: 15, color: '#fff' }}>
                Adicionar ao carrinho
              </Text>
            </Button>
          ) : (
            <Button
              disabled
              onPress={() => {
                handleAddProduct(produtoDetails, quantidade);
                navigation.goBack();
              }}>
              <Text style={{ fontSize: 15, color: '#fff' }}>
                Estabelecimento fechado
              </Text>
            </Button>
          )}
        </FooterTab>
      </Footer>
    </Background>
  );
}
