/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, TextInput, ActivityIndicator } from 'react-native';
import Background from '../../../components/Background';
import { unformatNumber, unformatPrice } from '../../../util/format';
import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

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
  const { address, orderDetails, paymentMethod, troco } = route.params;

  const [loading, setLoading] = useState(false);
  const [observacao, setObservacao] = useState('');

  const userId = useSelector(state => state.user.profile.id);
  const name = useSelector(state => state.user.profile.name);
  const idloja = useSelector(state => state.cart[0].estabelecimento.id);
  const loja = useSelector(state => state.cart[0].estabelecimento.name_loja);
  const image = useSelector(state => state.cart[0].estabelecimento.image.url);

  const products = useSelector(state =>
    state.cart.map(product => ({
      product_id: product.id,
      name: product.name,
      quantity: product.amount,
      image: product.image.url,
      price: product.price,
      total: product.amount * product.price,
    })),
  );

  async function handleSubmit() {
    try {
      setLoading(true);
      const response = await api.post('orders', {
        user_id: userId,
        estabelecimento_id: idloja,
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
        observacao: observacao,
        troco: troco,
        delivery_fee: unformatPrice(orderDetails.deliveryFee),
        products,
      });
      const orders = response.data;
      navigation.navigate('PaymentResult', { status: 'success', orders });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      navigation.navigate('PaymentResult', { status: 'failed', orders });
    }
  }

  return (
    <Background>
      <Container>
        <ScrollView>
          <ListItem>
            <Thumbnail
              large
              source={{
                uri: image.replace('localhost', '10.0.0.104'),
              }}
            />
            <Body>
              <Text style={{ marginLeft: 10 }}>{loja}</Text>
            </Body>
          </ListItem>

          <Text style={{ marginLeft: 5 }}>PRODUTOS</Text>
          {products.map(item => (
            <ListItem key={item.id}>
              <Text>{item.quantity}x</Text>
              <Thumbnail
                small
                source={{
                  uri: item.image.replace('localhost', '10.0.0.104'),
                }}
              />
              <Body>
                <Text style={{ marginLeft: 10 }}>{item.name}</Text>
              </Body>

              <Right>
                <Text note>{formatPrice(item.price)}</Text>
                <Text>{formatPrice(item.total)}</Text>
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
          <Text style={{ marginLeft: 5 }}>Alguma observação?</Text>
          <TextInput
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderWidth: 1,
              borderColor: '#c3c3c3',
              marginTop: 12,
              height: 100,
              marginLeft: 10,
              marginRight: 10,
              borderRadius: 10,
              margin: 2,
            }}
            required
            maxLength={30}
            autoCorrect={false}
            keyboardType="numeric"
            value={observacao}
            onChangeText={setObservacao}
            placeholder="Alguma observação?."
            placeholderTextColor="#c3c3c3"
          />
        </ScrollView>
        {loading ? (
          <Footer>
            <FooterTab style={{ backgroundColor: '#228B22' }}>
              <Button
                onPress={() => {
                  handleSubmit();
                }}>
                <Text style={{ fontSize: 15, color: '#fff' }}>
                  Só um momento
                </Text>
                <ActivityIndicator color={'#fff'} style={{ display: 'flex' }} />
              </Button>
            </FooterTab>
          </Footer>
        ) : (
          <Footer>
            <FooterTab style={{ backgroundColor: '#F4A460' }}>
              <Button
                onPress={() => {
                  handleSubmit();
                }}>
                <Text style={{ fontSize: 15, color: '#fff' }}>
                  Comfirmar Pedido
                </Text>
              </Button>
            </FooterTab>
          </Footer>
        )}
      </Container>
    </Background>
  );
}
