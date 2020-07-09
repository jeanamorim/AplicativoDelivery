/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import storage from '@react-native-community/async-storage';
import Background from '../../../components/Background';
import { useSelector } from 'react-redux';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  unformatNumber,
  unformatPrice,
  formatPrice,
} from '../../../util/format';
import {
  Button,
  Text,
  Body,
  Left,
  Right,
  List,
  ListItem,
  View,
  Content,
  CardItem,
  Container,
  Card,
  Footer,
  FooterTab,
} from 'native-base';
import api from '../../../services/api';
import Modal from 'react-native-modal';
import EnderecoComfirmation from '../../../components/Finalizacao/EndereçoComfirmation';
import PagamentoComfirmation from '../../../components/Finalizacao/PagamentoComfirmation';

export default function OfertasPrincipal({ navigation, route }) {
  const [address, setAdresses] = useState([]);

  const [loading, setLoading] = useState(false);
  const [observacao, setObservacao] = useState('');
  const [produto, setProducts] = useState([]);
  const [idPedido, setIdPedido] = useState([]);
  const { orderDetails, paymentMethod, troco, id } = route.params;
  const userId = useSelector(state => state.user.profile.id);
  const name = useSelector(state => state.user.profile.name);
  console.tron.log(idPedido);
  useEffect(() => {
    async function BuscarEndereco() {
      try {
        const response = JSON.parse(
          await storage.getItem(`KEY_VALUE_ID/${userId}`),
        );
        setAdresses(response);
      } catch (error) {
        Alert.alert('Error:', error.message);
      }
    }

    BuscarEndereco();
  }, [userId]);

  useEffect(() => {
    async function getData() {
      const response = await api.get(`cart/${id}`);
      setProducts(response.data);
    }
    getData();
  }, [id]);
  const products = produto.map(product => ({
    product_id: product.product.id,
    name: product.product.name,
    image: product.product.image.url,
    quantity: product.quantidade,
    price: product.product.price,
    observacao: product.observacao,
    total: product.quantidade * product.product.price,
  }));

  async function handleSubmit() {
    try {
      setLoading(true);
      if (paymentMethod === 'CARTAO') {
        const response = await api.post('orders', {
          user_id: userId,
          estabelecimento_id: id,
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
          observacao: observacao,
          troco: troco,
          products,
        });
        setIdPedido(response.data.id);
      } else if (paymentMethod === 'DINHEIRO') {
        const response = await api.post('orders', {
          user_id: userId,
          estabelecimento_id: id,
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
        setIdPedido(response.data.id);
      }

      navigation.navigate('PaymentResult', {
        status: 'success',
        orderId: idPedido,
      }),
        setLoading(false);
    } catch (err) {
      setLoading(false);
      navigation.navigate('PaymentResult', { status: 'failed' });
    }
  }

  async function deleteCart() {}

  return (
    <Background>
      <Content>
        <EnderecoComfirmation />
        <Card
          style={{
            backgroundColor: '#fff',
            elevation: 5,
            marginTop: 5,
            maxHeight: 130,
            minHeight: 130,
            borderColor: '#000',
            borderWidth: 2,
          }}>
          <ListItem>
            <List>
              <Text
                style={{ marginLeft: -14, marginTop: -35, color: '#FF0000' }}>
                Forma de pagamento
              </Text>
            </List>
            <Left>
              <Text
                note
                style={{
                  marginLeft: -170,
                  marginTop: 30,
                  color: '#000000',
                }}>
                Você selecionou: {paymentMethod}
              </Text>
            </Left>
            <Right>
              <Icon
                style={{ marginTop: 10, marginLeft: 20 }}
                name="angle-down"
                size={35}
                color="#FF0000"
                onPress={() => {
                  navigation.navigate('PaymentMethod', {
                    orderDetails: orderDetails,
                  });
                }}
              />
            </Right>
          </ListItem>
        </Card>
        <Card
          style={{
            backgroundColor: '#fff',
            elevation: 5,
            marginTop: 5,
            maxHeight: 190,
            minHeight: 190,
            borderColor: '#000',
            borderWidth: 2,
          }}>
          <Text style={{ marginLeft: 8, marginTop: 5, color: '#FF0000' }}>
            Comfirmação
          </Text>
          <ListItem>
            <Body style={{ marginLeft: -20, marginTop: -10 }}>
              <Text note>Produtos</Text>
              <Text note>Entrega</Text>
              <Text>Total</Text>
              <Text>Pagamento</Text>
            </Body>
            <Right style={{ marginTop: -10 }}>
              <Text note>{orderDetails.subtotal}</Text>
              <Text note>{orderDetails.deliveryFee}</Text>
              <Text>{orderDetails.total}</Text>
              <Text>{paymentMethod}</Text>
            </Right>
          </ListItem>
          <ListItem>
            <Body style={{ marginLeft: -20, marginTop: -10 }}>
              <Text>Troco para</Text>
            </Body>
            <Right style={{ marginTop: -10 }}>
              <Text>{formatPrice(troco)}</Text>
            </Right>
          </ListItem>
        </Card>
        <Card
          style={{
            backgroundColor: '#fff',
            elevation: 5,
            marginTop: 4,
            maxHeight: 130,
            minHeight: 130,
            borderColor: '#000',
            borderWidth: 2,
          }}>
          <ListItem>
            <List>
              <Text
                style={{ marginLeft: -14, marginTop: -70, color: '#FF0000' }}>
                Alguma observação?
              </Text>
            </List>
            <List>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#c3c3c3',
                  marginTop: 30,
                  height: 80,

                  width: 389,
                  marginLeft: -163,
                }}
                value={observacao}
                onChangeText={setObservacao}
                required
                maxLength={50}
                autoCorrect={false}
                placeholder="alguma observação?"
                placeholderTextColor="#c3c3c3"
              />
            </List>
          </ListItem>
        </Card>
      </Content>

      <Footer>
        <FooterTab style={{ backgroundColor: '#F4A460' }}>
          <Button loading={loading} onPress={handleSubmit}>
            <Text style={{ fontSize: 15, color: '#fff' }}>
              Comfirmar pedido
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Background>
  );
}
