/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-native';
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

export default function PaymentResult({ navigation, route }) {
  const { status, orders } = route.params;

  setTimeout(
    () =>
      navigation.navigate({
        name: 'OrdersRoutes',
        params: { screen: 'OrderDetails', orders },
      }),
    2000,
  );

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
