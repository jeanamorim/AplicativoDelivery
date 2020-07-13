/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { Picker, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, Image, Text, View, Alert } from 'react-native';
import Background from '../../components/Background';
import translate from '../../locales';
import Icons from 'react-native-vector-icons/FontAwesome5';
import api from '../../services/api';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';

import {
  Container,
  ProductList,
  CartTotalLabel,
  CartTotalValue,
  ProductContainer,
  Product,
  ProductInfo,
  Title,
  Value,
  CartItemSubTotal,
  CartItemCount,
  CartItemTotalValue,
  CartTotal,
  ProductInfoValor,
  RemoveCart,
  ObservacaoProducto,
  TextoObs,
} from './styles';
import { Button, Footer, FooterTab } from 'native-base';

export default function Cart({ navigation, route }) {
  const { id } = route.params;

  const [feeConfig, setFeeConfig] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function getData() {
    if (loading) {
      return;
    }
    setLoading(true);
    const response = await api.get(`cart/${id}?=page${page}`);
    setProducts([...products, ...response.data]);
    setPage(page + 1);
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);

  async function HandleRemove(item) {
    await api.delete(`cart/${item}`);
    const response = await api.get(`cart/${id}`);
    setProducts(response.data);
  }
  async function HandlerUpdate(itemValue, item) {
    await api.put(`cart/${item}`, {
      quantidade: itemValue,
    });
    const response = await api.get(`cart/${id}`);
    setProducts(response.data);
  }
  const cart = products.map(product => ({
    ...product,
    subtotal: formatPrice(product.quantidade * product.product.price),
  }));

  const subtotal = formatPrice(
    products.reduce((totalSum, product) => {
      return totalSum + product.quantidade * product.product.price;
    }, 0),
  );

  const unformattedSubtotal = products.reduce((totalSum, product) => {
    return totalSum + product.quantidade * product.product.price;
  }, 0);

  const total = formatPrice(
    products.reduce((totalSum, product) => {
      return totalSum + product.quantidade * product.product.price;
    }, 0) + deliveryFee,
  );

  const formattedDeliveryFee = formatPrice(deliveryFee);

  useEffect(() => {
    async function getDeliveryFee() {
      if (!feeConfig.length) {
        const response = await api.get('settings');

        if (response.data.length) {
          const parsedFeeConfig = JSON.parse(response.data[0].delivery_fee);

          setFeeConfig(parsedFeeConfig);

          const fee =
            unformattedSubtotal >= parsedFeeConfig[1] ? 0 : parsedFeeConfig[0];

          setDeliveryFee(fee);
        }
      } else {
        const fee = unformattedSubtotal >= feeConfig[1] ? 0 : feeConfig[0];

        setDeliveryFee(fee);
      }
    }

    getDeliveryFee();
  }, [subtotal]);

  const dispatch = useDispatch();

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

  return (
    <Background>
      {cart.length > 0 ? (
        <Container>
          <ProductList
            style={{ marginTop: 10 }}
            contentContainerStyle={{ paddingHorizontal: 2 }}
            data={products}
            keyExtractor={item => String(item.id)}
            onEndReached={getData}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
            renderItem={({ item }) => (
              <ProductContainer>
                <Product>
                  <Image
                    source={{
                      uri: item.product.image.url.replace(
                        'localhost',
                        '10.0.0.104',
                      ),
                    }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                  <ProductInfo>
                    <Title>{item.product.name}</Title>
                  </ProductInfo>
                  <ProductInfoValor>
                    <Value>{formatPrice(item.product.price)}</Value>
                    <CartItemTotalValue>{item.subtotal}</CartItemTotalValue>
                  </ProductInfoValor>
                </Product>
                {item.observacao ? (
                  <ObservacaoProducto>
                    <TextoObs>{item.observacao}</TextoObs>
                  </ObservacaoProducto>
                ) : (
                  <Text />
                )}

                <CartItemSubTotal>
                  <CartItemCount>
                    <Picker
                      selectedValue={item.quantidade}
                      style={{ height: 50, width: 100 }}
                      onValueChange={(itemValue, itemIndex) =>
                        HandlerUpdate(itemValue, item.id)
                      }>
                      <Picker.Item label="1" value="1" />
                      <Picker.Item label="2" value="2" />
                      <Picker.Item label="3" value="3" />
                      <Picker.Item label="4" value="4" />
                      <Picker.Item label="5" value="5" />
                      <Picker.Item label="6" value="6" />
                      <Picker.Item label="7" value="7" />
                      <Picker.Item label="8" value="8" />
                      <Picker.Item label="9" value="9" />
                      <Picker.Item label="10" value="10" />
                    </Picker>
                    <Text>Quantidade</Text>
                  </CartItemCount>

                  <TouchableOpacity onPress={() => HandleRemove(item.id)}>
                    <RemoveCart>
                      <Icon name="delete-forever" color="#FF0000" size={17} />
                      <Text style={{ fontSize: 12, color: '#FF0000' }}>
                        Remover do carrinho
                      </Text>
                    </RemoveCart>
                  </TouchableOpacity>
                </CartItemSubTotal>
              </ProductContainer>
            )}
          />

          <Button
            onPress={() =>
              Alert.alert(
                'Tem certeza que deseja remover todos itens do seu carrinho?',
                '=)',
                [
                  {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Sim',
                    onPress: () => dispatch(CartActions.EmptyCart()),
                  },
                ],
                { cancelable: false },
              )
            }
            style={{
              height: 25,
              borderRadius: 7,
              alignSelf: 'center',
              backgroundColor: '#fff',
              borderColor: '#FF0000',
              borderWidth: 1,
            }}>
            <Text style={{ alignSelf: 'center', color: '#FF0000' }}>
              Esvaziar carrinho
            </Text>
          </Button>

          <CartTotal>
            <CartTotalLabel>SUB-TOTAL</CartTotalLabel>
            <CartTotalValue>{total}</CartTotalValue>
          </CartTotal>

          <Footer>
            <FooterTab style={{ backgroundColor: '#F4A460' }}>
              <Button
                onPress={() =>
                  navigation.navigate('DeliveryAddress', {
                    orderDetails: {
                      subtotal,
                      total,
                      deliveryFee: formattedDeliveryFee,
                    },
                    id: id,
                  })
                }>
                <Text style={{ fontSize: 15, color: '#fff' }}>
                  Finalisar Pedido
                </Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Iconn name="cart" size={85} color="#CFCFCF" />
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            Nenhum produto adicionado no carrinho
          </Text>
          <Text
            onPress={() => navigation.navigate('ProductsLojas')}
            style={{ color: '#F4A460', fontWeight: 'bold', fontSize: 16 }}>
            Voltar
          </Text>
        </View>
      )}
    </Background>
  );
}
