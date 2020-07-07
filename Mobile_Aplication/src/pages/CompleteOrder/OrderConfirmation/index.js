/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';
import storage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '../../../components/Background';
import * as CartActions from '../../../store/modules/cart/actions';
import { unformatNumber, unformatPrice } from '../../../util/format';
import api from '../../../services/api';
import { formatPrice } from '../../../util/format';
import {
  ConfirmButton,
  Card,
  CardHeader,
  CardTitle,
  Title,
  Subtitle,
  DateRow,
  DateContainer,
  TitleTotal,
} from './styles';
import {
  Container,
  Header,
  Text,
  Left,
  Body,
  Thumbnail,
  List,
  ListItem,
  Button,
  Footer,
  FooterTab,
  Right,
  Item,
} from 'native-base';

export default function OrderConfirmation({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [idloja, setIdloja] = useState([]);
  const [address, setAdresses] = useState([]);
  const { orderDetails, paymentMethod, troco } = route.params;

  const userId = useSelector(state => state.user.profile.id);
  const name = useSelector(state => state.user.profile.name);

  const products = useSelector(state =>
    state.cart.map(product => ({
      product_id: product.id,
      name: product.name,
      image: product.image.url,
      quantity: product.amount,
      price: product.price,
      total: product.amount * product.price,
    })),
  );

  useEffect(() => {
    async function BuscarEndereco() {
      try {
        const response = JSON.parse(
          await storage.getItem('KEY_VALUE_ADRESS_ENTREGA'),
        );
        console.tron.log(response);
        setAdresses(response);
      } catch (error) {
        Alert.alert('Error:', error.message);
      }
    }

    BuscarEndereco();
  }, [setAdresses]);

  useEffect(() => {
    async function loadId() {
      try {
        const response = JSON.parse(
          await storage.getItem('KEY_VALUE_ID_ESTABELECIMENTO'),
        );

        setIdloja(response);
      } catch (error) {
        Alert.alert('Error:', error.message);
      }
    }

    loadId();
  }, []);
  const deleteidEstabelecimento = async () => {
    try {
      await storage.removeItem('KEY_VALUE_ID_ESTABELECIMENTO');
    } catch (error) {
      console.log(error.message);
    }
  };

  const dispatch = useDispatch();
  async function handleSubmit() {
    try {
      setLoading(true);
      if (paymentMethod === 'CARTAO') {
        await api.post('orders', {
          user_id: userId,
          estabelecimento_id: idloja.id,
          status: 'PENDENTE',
          addressee: name,
          ship_postal_code: unformatNumber(address.postal_code),
          ship_street: address.street,
          ship_street_n: address.street_n,
          ship_neighborhood: address.neighborhood,
          ship_city: address.city,
          ship_state: address.state,
          ship_complement: address.complement,
          ship_reference: address.reference,
          payment_method: paymentMethod,
          payment_condition: 1,
          delivery_fee: unformatPrice(orderDetails.deliveryFee),
          products,
        });
      } else if (paymentMethod === 'DINHEIRO') {
        await api.post('orders', {
          user_id: userId,
          estabelecimento_id: idloja.id,
          status: 'PENDENTE',
          addressee: name,
          ship_postal_code: unformatNumber(address.postal_code),
          ship_street: address.street,
          ship_street_n: address.street_n,
          ship_neighborhood: address.neighborhood,
          ship_city: address.city,
          ship_state: address.state,
          ship_complement: address.complement,
          ship_reference: address.reference,
          payment_method: paymentMethod,
          payment_condition: 1,
          delivery_fee: unformatPrice(orderDetails.deliveryFee),
          products,
        });
      }
      setLoading(false);
      navigation.navigate('PaymentResult', { status: 'success' });
    } catch (err) {
      setLoading(false);
      navigation.navigate('PaymentResult', { status: 'failed' });
    }
  }

  return (
    <Background>
      <Container>
        <ScrollView>
          <ListItem>
            <Thumbnail />
            <Body>
              <Text style={{ marginLeft: 10 }}>{idloja.name_loja}</Text>
            </Body>
          </ListItem>

          <Text style={{ marginLeft: 5 }}>PRODUTOS</Text>
          {products.map(item => (
            <ListItem>
              <Text>{item.quantity}x</Text>
              <Thumbnail
                small
                source={{
                  uri: item.image.replace('localhost', '10.0.0.106'),
                }}
              />
              <Body>
                <Text style={{ marginLeft: 10 }}>{item.name}</Text>
              </Body>

              <Right>
                <Text note>{formatPrice(item.price)}</Text>
              </Right>
            </ListItem>
          ))}

          <Text style={{ marginLeft: 5 }}>ENTREGA</Text>
          <ListItem>
            <Body>
              <Text note style={{ fontSize: 14 }}>
                {`${address.street}, ${address.neighborhood} - ${
                  address.street_n
                }`}
              </Text>
              <Text note>{`${address.city} - ${address.state}`}</Text>
              <Text note>{address.postal_code}</Text>
              <Text note>{address.complement}</Text>
              <Text note>{address.reference}</Text>
            </Body>
          </ListItem>
          <Text style={{ marginLeft: 5 }}>TOTAIS E PAGAMENTOS</Text>
          <ListItem>
            <Body>
              <Text note>Subtotal</Text>
              <Text note>Entrega</Text>
              <Text>Total</Text>
              <Text>Pagamento</Text>
              {paymentMethod === 'CARTAO' ? (
                <Text note />
              ) : (
                <Text note>Cliente optou troco para:</Text>
              )}
            </Body>
            <Right>
              <Text note>{orderDetails.subtotal}</Text>
              <Text note>{orderDetails.deliveryFee}</Text>
              <Text>{orderDetails.total}</Text>
              <Text>{paymentMethod}</Text>
              {paymentMethod === 'CARTAO' ? (
                <Text note />
              ) : (
                <Text note>{formatPrice(troco)}</Text>
              )}
            </Right>
          </ListItem>
        </ScrollView>
        <Footer>
          <FooterTab style={{ backgroundColor: '#F4A460' }}>
            <Button
              loading={loading}
              onPress={() => {
                handleSubmit();
                dispatch(CartActions.EsvaziarCart());
                deleteidEstabelecimento;
              }}>
              <Text style={{ fontSize: 15, color: '#fff' }}>
                Comfirmar Pedido
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </Background>
  );
}
