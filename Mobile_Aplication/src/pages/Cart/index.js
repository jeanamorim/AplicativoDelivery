/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import translate from '../../locales';
import {
  Text,
  View,
  Alert,
  ActivityIndicator,
  Picker,
  StyleSheet,
} from 'react-native';
import Background from '../../components/Background';

import api from '../../services/api';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';

import {
  CartContainer,
  MainContainer,
  Products,
  Product,
  ProductDetails,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductWeight,
  ProductRemoveButton,
  ProductAmount,
  ProductControls,
  ProductControlButton,
  ProductSubTotal,
  DetailsContainer,
  SubtotalOpcao,
  SubtotalLabel,
  SubTotalValue,
  DeliveryCharges,
  DeliveryChargesLabel,
  DeliveryChargesValue,
  GrandTotal,
  GrandTotalLabel,
  GrandTotalValue,
  CartFooter,
  ConfirmOrderText,
  ViewDetailsButton,
  TotalContainer,
  Total,
  EmptyCart,
  WatermelonAnimation,
  EmptyCartTextContainer,
  EmptyCartText,
  EmptyCartSubText,
  ProductOpcao,
  Subtotal,
  CampoObservacao,
  TextObservacao,
  ProductPrice,
  DetailsContainerSub,
  ButtonAdd,
  TextInfo,
  CartTotal,
  CartTotalLabel,
  CartTotalValue,
} from './styles';
import {
  Button,
  Footer,
  FooterTab,
  Body,
  ListItem,
  List,
  Content,
} from 'native-base';

export default function Cart({ navigation, route }) {
  const [feeConfig, setFeeConfig] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [listt, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  let animRef;

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(
        product.amount * (product.price + product.valorItens),
      ),
    })),
  );

  const subtotal = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.amount * (product.price + product.valorItens);
      }, 0),
    ),
  );

  console.tron.log(cart);
  const unformattedSubtotal = useSelector(state =>
    state.cart.reduce((totalSum, product) => {
      return totalSum + product.amount * (product.price + product.valorItens);
    }, 0),
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.amount * (product.price + product.valorItens);
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

  function increment(item) {
    setLoading(true);
    dispatch(CartActions.updateAmountRequest(item.id, item.amount + 1));
    setLoading(false);
  }

  function decrement(item) {
    setLoading(true);
    dispatch(CartActions.updateAmountRequest(item.id, item.amount - 1));
    setLoading(false);
  }

  return (
    <Background>
      <CartContainer>
        {cart.length ? (
          <>
            <MainContainer>
              <Products>
                {cart.map(product => (
                  <Product key={product.id}>
                    <ProductDetails>
                      <ProductImage
                        source={{
                          uri: product.image.url,
                        }}
                      />

                      <ProductInfo>
                        <ProductTitle>{product.name}</ProductTitle>
                      </ProductInfo>
                      <ProductRemoveButton
                        onPress={() =>
                          dispatch(CartActions.removeFromCart(product.id))
                        }>
                        <Icon name="trash" color="#f00" size={18} />
                      </ProductRemoveButton>
                    </ProductDetails>
                    {product.valor.map(item => (
                      <DetailsContainer key={item.id}>
                        <SubtotalOpcao>
                          <SubtotalLabel>{item.name}</SubtotalLabel>
                          <SubTotalValue>
                            + {formatPrice(item.price)}
                          </SubTotalValue>
                        </SubtotalOpcao>
                      </DetailsContainer>
                    ))}
                    <CampoObservacao>
                      {product.observacao ? (
                        <TextObservacao>{product.observacao}</TextObservacao>
                      ) : null}
                    </CampoObservacao>

                    <ProductControls>
                      <ProductControlButton onPress={() => decrement(product)}>
                        <Iconn
                          style={{ margin: 2 }}
                          name="minus-circle-outline"
                          size={30}
                          color="#f4a460"
                        />
                      </ProductControlButton>
                      <Text style={{ fontSize: 16, margin: 5 }}>
                        {product.amount}
                      </Text>
                      <ProductControlButton onPress={() => increment(product)}>
                        <Iconn
                          style={{ margin: 2 }}
                          name="plus-circle-outline"
                          size={30}
                          color="#f4a460"
                        />
                      </ProductControlButton>

                      <ProductPrice>{formatPrice(product.price)}</ProductPrice>
                      <ProductSubTotal>{product.subtotal}</ProductSubTotal>
                    </ProductControls>
                  </Product>
                ))}
              </Products>
            </MainContainer>

            <CartTotal>
              <ButtonAdd
                onPress={() =>
                  navigation.navigate('DeliveryAddress', {
                    orderDetails: {
                      subtotal,
                      total,
                      deliveryFee: formattedDeliveryFee,
                    },
                  })
                }>
                <CartTotalLabel>Finalização</CartTotalLabel>
                <CartTotalValue>{total}</CartTotalValue>
              </ButtonAdd>
            </CartTotal>
          </>
        ) : (
          <EmptyCart>
            <WatermelonAnimation
              ref={ref => (animRef = ref)}
              onAnimationFinish={() => animRef.play(419, 563)}
            />
            <EmptyCartTextContainer>
              <EmptyCartText>Seu carrinho está vazio</EmptyCartText>
              <EmptyCartSubText>
                Encha essa cesta com produtos deliciosos
              </EmptyCartSubText>
            </EmptyCartTextContainer>
          </EmptyCart>
        )}
      </CartContainer>
    </Background>
  );
}
