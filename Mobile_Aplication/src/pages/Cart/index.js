/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
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
  Amount,
  CartItemTotalValue,
  CheckoutButton,
  CartTotal,
  EmptyCartContainer,
  EmptyCart,
  EmptyCartMessage,
  BackHomeButton,
  WatermelonAnimation,
  EmptyCartTextContainer,
  EmptyCartText,
  EmptyCartSubText,
  ProductInfoValor,
  RemoveCart,
  ObservacaoProducto,
  TextoObs,
} from './styles';
import {
  Button,
  Header,
  Input,
  Item,
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
  CheckBox,
  Form,
  Textarea,
  Footer,
  FooterTab,
} from 'native-base';

export default function Cart({ navigation }) {
  const [feeConfig, setFeeConfig] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.amount * product.price),
    })),
  );
  console.tron.log(cart);
  const subtotal = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.amount * product.price;
      }, 0),
    ),
  );

  const unformattedSubtotal = useSelector(state =>
    state.cart.reduce((totalSum, product) => {
      return totalSum + product.amount * product.price;
    }, 0),
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.amount * product.price;
      }, 0) + deliveryFee,
    ),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtotal]);

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  return (
    <Background>
      {cart.length > 0 ? (
        <Container>
          <ProductList
            data={cart}
            keyExtractor={product => String(product.id)}
            renderItem={({ item }) => (
              <ProductContainer>
                <Product>
                  <Image
                    source={{
                      uri: item.image.url.replace('localhost', '10.0.0.106'),
                    }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                  />
                  <ProductInfo>
                    <Title>{item.name}</Title>
                  </ProductInfo>
                  <ProductInfoValor>
                    <Value>{formatPrice(item.price)}</Value>
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
                    <TouchableOpacity onPress={() => decrement(item)}>
                      <Icon
                        name="remove-circle-outline"
                        size={25}
                        color="#F4A460"
                      />
                    </TouchableOpacity>
                    <Amount>{item.amount}</Amount>
                    <TouchableOpacity onPress={() => increment(item)}>
                      <Icon
                        name="add-circle-outline"
                        size={25}
                        color="#F4A460"
                      />
                    </TouchableOpacity>
                  </CartItemCount>

                  <TouchableOpacity
                    onPress={() =>
                      dispatch(CartActions.removeFromCart(item.id))
                    }>
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
