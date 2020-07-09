/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import storage from '@react-native-community/async-storage';
import { dateLanguage } from '../../../locales';
import { formatPrice } from '../../../util/format';
import { format, parseISO, formatDistanceStrict } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
  Container,
  SuccessAnimationContainer,
  SuccessAnimation,
  SucessTextContainer,
  SucessTextHeader,
  FailedAnimationContainer,
  FailedAnimation,
} from './styles';
import api from '../../../services/api';
export default function PaymentResult({ navigation, route }) {
  const id = useSelector(state => state.user.profile.id);
  const { status, orderId } = route.params;
  const [order, setOrder] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get(`orders_user/${56}`);

      navigation.navigate('OrdersRoutes', {
        screen: 'OrdersDetails',
        order: response.data[0],
      });
    }

    loadOrders();
  }, [id, navigation]);

  useEffect(() => {
    async function deleteCart() {
      const response = await api.get(`orders_user/${56}`);

      navigation.navigate('OrdersRoutes', {
        screen: 'OrdersDetails',
        order: response.data[0],
      });
    }

    deleteCart();
  }, [id, navigation]);


  return (
    <Container status={status}>
      {status === 'success' ? (
        <>
          <SuccessAnimationContainer>
            <SuccessAnimation />
          </SuccessAnimationContainer>
          <SucessTextContainer>
            <SucessTextHeader>Pedido confirmado com Sucesso</SucessTextHeader>
          </SucessTextContainer>
        </>
      ) : (
        <>
          <FailedAnimationContainer>
            <FailedAnimation />
          </FailedAnimationContainer>
        </>
      )}
    </Container>
  );
}
PaymentResult.navigationOptions = ({ navigation }) => ({
  title: 'Resultado do pedido',
});
