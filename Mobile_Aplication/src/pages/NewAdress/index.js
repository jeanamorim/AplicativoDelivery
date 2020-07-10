import React, { useState } from 'react';
import colors from '../../styles/colors';
import Background from '../../components/Background';
import { StatusBar } from 'react-native';
import DeliveryAddressForm from '../../forms/DeliveryAddressForm';

import { Container, FormContainer } from './styles';

export default function DeliveryAddress({ navigation }) {
  StatusBar.setBackgroundColor(colors.finalisar);
  return (
    <Background>
      <Container>
        <FormContainer>
          <DeliveryAddressForm navigation={navigation} />
        </FormContainer>
      </Container>
    </Background>
  );
}
