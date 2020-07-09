import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Wrapper,
  Container,
  PaymentMethodContainer,
  CashPayment,
  CashContainer,
  CashAnimationContainer,
  CashAnimation,
  CashPaymentText,
  MethodSelect,
  IconContainer,
  CreditCardIcon,
  CashIcon,
  MethodTitle,
  CreditCardPayment,
  NoCreditCardSavedAnimation,
  ContinueButton,
} from './styles';
import {
  Input,
  Item,
  Content,
  Form,
  Label,
  Footer,
  FooterTab,
  Button,
  Text,
  Header,
  Left,
  Body,
} from 'native-base';

export default function PaymentMethod({ navigation, route }) {
  const [methodSelected, setMethodSelected] = useState('DINHEIRO');
  const [loading, setLoading] = useState(false);

  console.tron.log(methodSelected);

  return (
    <Wrapper>
      <Container>
        <PaymentMethodContainer>
          <CashPayment onPress={() => setMethodSelected('DINHEIRO')}>
            <MethodSelect>
              <Icon
                name={
                  methodSelected === 'DINHEIRO'
                    ? 'radiobox-marked'
                    : 'radiobox-blank'
                }
                size={16}
                color="#fff"
              />
            </MethodSelect>
            <IconContainer>
              <CashIcon />
              <MethodTitle>Dinheiro</MethodTitle>
            </IconContainer>
          </CashPayment>
          <CreditCardPayment onPress={() => setMethodSelected('CARTAO')}>
            <MethodSelect>
              <Icon
                name={
                  methodSelected === 'CARTAO'
                    ? 'radiobox-marked'
                    : 'radiobox-blank'
                }
                size={16}
                color="#fff"
              />
            </MethodSelect>
            <IconContainer>
              <CreditCardIcon />
              <MethodTitle>Cartão de credito</MethodTitle>
            </IconContainer>
          </CreditCardPayment>
        </PaymentMethodContainer>

        {methodSelected === 'DINHEIRO' ? (
          <CashContainer>
            <CashAnimationContainer>
              <CashAnimation />
            </CashAnimationContainer>
            <CashPaymentText>Aqui você paga no ato da entrega</CashPaymentText>
          </CashContainer>
        ) : (
          <CashContainer>
            <CashAnimationContainer>
              <NoCreditCardSavedAnimation />
            </CashAnimationContainer>
            <CashPaymentText>
              Aqui você passa o cartão ato da entrega
            </CashPaymentText>
          </CashContainer>
        )}
      </Container>
      <Footer>
        <FooterTab style={{ backgroundColor: '#F4A460' }}>
          {methodSelected === 'DINHEIRO' ? (
            <Button
              onPress={() =>
                navigation.navigate('Troco', {
                  paymentMethod: methodSelected,
                })
              }
              loading={loading}>
              <Text style={{ fontSize: 15, color: '#fff' }}>Finalização</Text>
            </Button>
          ) : (
            <Button
              onPress={() =>
                navigation.navigate('OrderConfirmation', {
                  paymentMethod: methodSelected,
                })
              }
              loading={loading}>
              <Text style={{ fontSize: 15, color: '#fff' }}>Finalização</Text>
            </Button>
          )}
        </FooterTab>
      </Footer>
    </Wrapper>
  );
}
