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
  const { status, orderId, idLoja } = route.params;

  /*
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
 */

  setTimeout(() => navigation.navigate('Home'), 2000);
  useEffect(() => {
    async function deleteCart() {
      await api.delete(`cart/${idLoja}`);
    }

    deleteCart();
  }, [id, idLoja, navigation]);

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
