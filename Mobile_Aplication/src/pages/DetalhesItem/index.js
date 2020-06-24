/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, ScrollView, ImageBackground } from 'react-native';
import storage from '@react-native-community/async-storage';
import Background from '../../components/Background';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addToCartRequest } from '../../store/modules/cart/actions';
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
  View,
  Thumbnail,
  List,
  ListItem,
  Separator,
  CardItem,
  Card,
  CheckBox,
  Form,
  Textarea,
  Footer,
  FooterTab,
} from 'native-base';
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';
export default function DetalhesItens({ navigation, route }) {
  const [variacao, setVariacao] = useState([]);

  const { produtoDetails, id_estabelecimento } = route.params;
  const id = produtoDetails.id;

  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const response = await api.get(`variacao_produto/${id}`);
      console.tron.log(response.data);
      setVariacao(response.data);
    }
    getData();
  }, [id]);

  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;
      return sumAmount;
    }, {}),
  );
  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function handleAddProduct(product) {
    dispatch(addToCartRequest(product));
  }

  return (
    <Background>
      <Container>
        <Header style={{ backgroundColor: '#F4A460', height: 50 }}>
          <Left>
            <Button transparent>
              <Icon
                color="#fff"
                size={25}
                name="arrow-back"
                onPress={() => navigation.navigate('produtoDetails')}
              />
            </Button>
          </Left>
          <Body>
            <Text
              style={{
                marginLeft: 0,
                marginTop: 4,
                color: '#fff',
                fontFamily: 'CerebriSans-ExtraBold',
                fontSize: 20,
              }}>
              Detalhes do item
            </Text>
          </Body>
        </Header>
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
          <Content style={{ marginTop: 30 }}>
            <Item
              style={{
                marginLeft: 110,
                marginRight: 150,
                borderColor: '#fff',
              }}>
              <Icon
                active
                size={29}
                name="remove"
                onPress={() => decrement(produtoDetails.id)}
                style={{ marginLeft: 10, marginRight: 20, color: '#f4a460' }}
              />
              <Text
                style={{
                  fontFamily: 'CerebriSans-ExtraBold',
                }}>
                {amount[produtoDetails.id] || 0}
              </Text>
              <Icon
                active
                size={29}
                name="add"
                onPress={() => increment(produtoDetails.id)}
                style={{ marginLeft: 20, marginRight: 20, color: '#f4a460' }}
              />
            </Item>
          </Content>

          <Body>
            <Text
              style={{
                fontFamily: 'CerebriSans-ExtraBold',
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
          </Body>
          <Body>
            <Text
              style={{
                fontFamily: 'CerebriSans-ExtraBold',
                color: '#20B402',
                marginTop: 0,
                marginLeft: -240,
              }}>
              {formatPrice(produtoDetails.price)}
            </Text>
          </Body>

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
                  </Body>
                  <Right>
                    <Button transparent>
                      <Icon
                        color="#000"
                        size={25}
                        name="arrow-forward"
                        onPress={() =>
                          navigation.navigate('Variacao', {
                            variacoes: variacoes,
                            produto: produtoDetails,
                          })
                        }
                      />
                    </Button>
                  </Right>
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
              />
            </Form>
          </Content>
        </ScrollView>
      </Container>

      <Footer>
        <FooterTab style={{ backgroundColor: '#F4A460' }}>
          <Button
            onPress={() => {
              handleAddProduct(produtoDetails);
              navigation.goBack();
            }}>
            <Text style={{ fontSize: 15, color: '#fff' }}>
              Adicionar ao carrinho
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Background>
  );
}
DetalhesItens.navigationOptions = {
  title: 'Detalhes do item',
};
