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
} from 'native-base';

export default function OrderConfirmation({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [idloja, setIdloja] = useState([]);
  const address = navigation.getParam('address');
  const orderDetails = navigation.getParam('orderDetails');
  const paymentMethod = navigation.getParam('paymentMethod');

  const userId = useSelector(state => state.user.profile.id);

  const products = useSelector(state =>
    state.cart.map(product => ({
      product_id: product.id,
      nome: product.name,
      quantity: product.amount,
      price: product.price,
      image_url: product.image.url,
      total: product.amount * product.price,
    })),
  );

  useEffect(() => {
    async function loadId() {
      try {
        const response = await storage.getItem('id_estabelecimento');

        setIdloja(response);
      } catch (err) {
        if (err.response) {
          console.tron.log('Erro no servidor');
        } else {
          console.tron.log('Falha ao conectar com o servidor');
        }
      }
    }

    loadId();
  }, []);
  const deleteidEstabelecimento = async () => {
    try {
      await storage.removeItem('id_estabelecimento');
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
          estabelecimento_id: idloja,
          status: 'PENDENTE',
          addressee: address.addressee,
          ship_postal_code: unformatNumber(address.postal_code),
          ship_street: address.street,
          ship_street_n: address.street_n,
          ship_neighborhood: address.neighborhood,
          ship_city: address.city,
          ship_state: address.state,
          payment_method: paymentMethod,
          payment_condition: 1,
          delivery_fee: unformatPrice(orderDetails.deliveryFee),
          products,
        });
      } else if (paymentMethod === 'DINHEIRO') {
        await api.post('orders', {
          user_id: userId,
          estabelecimento_id: idloja,
          status: 'PENDENTE',
          addressee: address.addressee,
          ship_postal_code: unformatNumber(address.postal_code),
          ship_street: address.street,
          ship_street_n: address.street_n,
          ship_neighborhood: address.neighborhood,
          ship_city: address.city,
          ship_state: address.state,
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
      <ScrollView>
        <Container>
          <Card>
            <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail
                    large
                    source={{
                      uri:
                        'data:image/jpeg;base64,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',
                    }}
                  />
                </Left>

                <Text>Supemercado Lima</Text>
              </ListItem>
            </List>
          </Card>
          <Card>
            <CardHeader>
              <Icon size={25} name="local-shipping" color="#F4A460" />
              <CardTitle>Produtos</CardTitle>
            </CardHeader>

            <DateRow>
              <DateContainer>
                <Title>jean</Title>
              </DateContainer>

              <DateContainer>
                <Title>{orderDetails.subtotal}</Title>
                <Title>{orderDetails.deliveryFee}</Title>
                <TitleTotal>{orderDetails.total}</TitleTotal>
              </DateContainer>
            </DateRow>
            <CardHeader>
              <Icon size={25} name="local-shipping" color="#F4A460" />
              <CardTitle>Entrega</CardTitle>
            </CardHeader>

            <Title>Destinatário</Title>
            <Subtitle>{`${address.street}, ${address.street_n} \n${
              address.neighborhood
            }\n${address.complement}\n${address.reference}\n${
              address.postal_code
            } - ${address.city} - ${address.state}`}</Subtitle>

            <CardHeader>
              <Icon size={25} name="local-shipping" color="#F4A460" />
              <CardTitle>Pagamento</CardTitle>
            </CardHeader>

            <DateRow>
              <DateContainer>
                <TitleTotal>{paymentMethod}</TitleTotal>
              </DateContainer>
            </DateRow>

            <CardHeader>
              <Icon size={25} name="local-shipping" color="#F4A460" />
              <CardTitle>Detalhes do pedido</CardTitle>
            </CardHeader>

            <DateRow>
              <DateContainer>
                <Title>Subtotal</Title>
                <Title>Taxa de entrega</Title>
                <Title>Total</Title>
              </DateContainer>

              <DateContainer>
                <Title>{orderDetails.subtotal}</Title>
                <Title>{orderDetails.deliveryFee}</Title>
                <TitleTotal>{orderDetails.total}</TitleTotal>
              </DateContainer>
            </DateRow>
          </Card>
        </Container>
      </ScrollView>
      <Footer>
        <FooterTab style={{ backgroundColor: '#F4A460' }}>
          <Button
            onPress={() => {
              handleSubmit();
              dispatch(CartActions.EsvaziarCart());
              deleteidEstabelecimento;
            }}
            loading={loading}>
            <Text style={{ fontSize: 15, color: '#fff' }}>
              Comfirmar Pedido
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Background>
  );
}
OrderConfirmation.navigationOptions = ({ navigation }) => ({
  title: 'Comfirme seu pedido',
});
