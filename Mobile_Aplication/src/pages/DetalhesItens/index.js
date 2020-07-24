/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import storage from '@react-native-community/async-storage';
import Background from '../../components/Background';
import ModalComfirmation from '../../components/ModalComfirmationCart';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import { addToCartRequest } from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';
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
  View,
} from 'native-base';
import api from '../../services/api';
import Modal from 'react-native-modal';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {
  ButtonAdd,
  TextInfo,
  CartTotal,
  CartTotalLabel,
  CartTotalValue,
} from './styles';
import CheckBox from '@react-native-community/checkbox';

export default function DetalhesItens({ navigation, route }) {
  const { produtoDetails, oferta } = route.params;
  const [variacao, setVariacao] = useState([]);

  const [loading, setLoading] = useState(false);
  const [quantidade, setQuantidade] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [total, setTotal] = useState(produtoDetails.price);
  const [checked, setChecked] = useState(false);
  const [valor, setValor] = useState([]);
  const [novo, setNovo] = useState([]);
  const [visible, setVisible] = useState(false);
  const [observacao, setObservação] = useState('');
  const id = produtoDetails.id;
  console.tron.log(valor);
  const productCart = useSelector(state => state.cart);
  const cartSize = useSelector(state => state.cart.length);

  function removeCart(product) {
    setLoading(true);
    dispatch(CartActions.EmptyCart());
    dispatch(addToCartRequest(product, observacao, quantidade));
    navigation.goBack();
    setLoading(false);
  }

  const dispatch = useDispatch();

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

  const totalItem = total + totalOpcao;
  const valorTotalPedido = totalItem * quantidade;

  function onChance(id, variacoes) {
    let novoArray = valor;
    let index = novoArray.findIndex(val => val.id === id.id);
    console.tron.log(index);
    if (index > -1) {
      novoArray.splice(index, 1);
      setValor([...novoArray]);
      return;
    }
    let novo = { ...id, variacoes };
    setValor([...novoArray, id]);
    return;
  }
  function verifyIfProductLoja(product) {
    setLoading(true);
    if (cartSize < 1) {
      dispatch(addToCartRequest(product, observacao, quantidade, valor));
      navigation.goBack();
      setLoading(false);
    } else {
      setLoading(true);
      if (productCart[0].estabelecimento.id === product.estabelecimento.id) {
        dispatch(addToCartRequest(product, observacao, quantidade, valor));
        navigation.goBack();
      } else {
        Alert.alert(
          'Atenção!',
          'Você possui produtos de outro estabelecimento no carrinho! Deseja removê-los?',
          [
            {
              text: 'Sim, quero.',
              onPress: () => removeCart(product),
              style: 'destructive',
            },
            { text: 'Não.' },
          ],
          { cancelable: false },
        );
      }
      setLoading(false);
    }
  }
  return (
    <Background>
      <Container>
        <ScrollView>
          <Card style={styles.card}>
            <CardItem cardBody>
              <Image
                source={{
                  uri: produtoDetails.image.url,
                }}
                style={styles.image}
              />
            </CardItem>
          </Card>

          <Item style={{ marginTop: 20 }}>
            <Left>
              <TextInfo style={styles.text}>{produtoDetails.name}</TextInfo>
              <Text note style={styles.text}>
                {produtoDetails.description}
              </Text>
              {oferta ? (
                <Text style={styles.oferta}>{formatPrice(oferta.from)}</Text>
              ) : null}
              {oferta ? (
                <Body style={{ flexDirection: 'row' }}>
                  <Button style={styles.buttonOferta}>
                    <Text style={styles.text}>em oferta</Text>
                  </Button>
                  <Text style={styles.price}>
                    {formatPrice(produtoDetails.price)}
                  </Text>
                </Body>
              ) : (
                <Text style={styles.price}>
                  {formatPrice(produtoDetails.price)}
                </Text>
              )}
            </Left>
          </Item>

          <Content style={styles.content}>
            {produtoDetails.variacao.map(variacoes => (
              <List style={styles.list} key={variacoes.id}>
                <ListItem>
                  <Body>
                    <Text style={styles.variacao}>{variacoes.name}</Text>
                    <Text
                      note
                      style={{
                        color: '#999',
                        fontSize: 9,
                      }}>
                      No mínimo {variacoes.minimo}. No máximo {variacoes.maximo}
                    </Text>
                    {variacoes.opcao.map(op => (
                      <ListItem key={op.id}>
                        <Body>
                          <Text>{op.name}</Text>
                        </Body>

                        <Text
                          style={{
                            color: '#20B402',
                          }}>
                          +{formatPrice(op.price)}
                        </Text>

                        <CheckBox
                          checked={checked}
                          onCheckColor={'#F4A460'}
                          value={valor.includes(op)}
                          onValueChange={() => onChance(op, variacoes.name)}
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
                value={observacao}
                onChangeText={setObservação}
                style={styles.textarea}
                rowSpan={5}
                placeholder="Alguma observação para os itens acima?"
                placeholderTextColor={'#9999'}
              />
            </Form>
          </Content>
        </ScrollView>
      </Container>

      <CartTotal>
        <Body style={styles.body}>
          <Iconn
            style={{ margin: 8 }}
            name="minus-circle-outline"
            size={33}
            color="#f4a460"
            onPress={() => decrement()}
          />
          <Text style={{ fontSize: 18 }}>{quantidade}</Text>
          <Iconn
            style={{ margin: 8 }}
            name="plus-circle-outline"
            size={33}
            color="#f4a460"
            onPress={() => increment()}
          />
        </Body>
        <ButtonAdd
          onPress={() => {
            verifyIfProductLoja(produtoDetails);
          }}>
          <CartTotalLabel>Adicionar</CartTotalLabel>
          <CartTotalValue> {formatPrice(valorTotalPedido)}</CartTotalValue>
        </ButtonAdd>
      </CartTotal>
    </Background>
  );
}
const styles = StyleSheet.create({
  card: {
    marginTop: 0,
    height: 200,
    width: null,
    flex: 1,
    borderRadius: 20,
  },
  image: {
    marginTop: 17,
    marginLeft: 9,
    marginRight: 9,
    height: 200,
    width: null,
    flex: 1,
    borderRadius: 20,
  },
  oferta: {
    color: '#f00',
    fontSize: 12,
    alignSelf: 'center',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  buttonOferta: {
    borderRadius: 20,
    width: 120,
    height: 25,
    backgroundColor: '#B22222',
    marginLeft: -120,
    marginTop: 5,
  },
  text: {
    alignSelf: 'center',
  },
  price: {
    color: '#20B402',
    fontSize: 20,
    alignSelf: 'center',
    margin: 5,
  },
  content: {
    marginTop: 20,
  },
  list: {
    marginLeft: -20,
  },
  variacao: {
    fontSize: 18,

    color: '#F4A460',
    textTransform: 'uppercase',
  },
  textarea: {
    borderRadius: 20,

    height: 90,
    color: '#999',
  },
  body: {
    flexDirection: 'row',
    alignContent: 'center',
    marginLeft: 10,
  },
});
