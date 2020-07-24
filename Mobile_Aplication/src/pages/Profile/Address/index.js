/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Alert } from 'react-native';
import Background from '../../../components/Background';
import api from '../../../services/api';
import { unformatNumber } from '../../../util/format';

import DeliveryAddressForm from '../../../forms/DeliveryAddressForm';

import { Container, FormContainer } from './styles';
import {
  Label,
  Picker,
  Item,
  Footer,
  FooterTab,
  Button,
  Text,
} from 'native-base';

export default function DeliveryAddress({ navigation, route, onSubmit }) {
  const [loading, setLoading] = useState(false);

  async function handleFormSubmit(address, haveAddress) {
    const formattedAddress = {
      ...address,
      postal_code: unformatNumber(address.postal_code),
    };
    if (address.neighborhood === '') {
      setLoading(true);
      Alert.alert(
        'Dados faltando',
        'Você precisa selecionar um bairro para entrega',
      );
      setLoading(false);
      return;
    }
    if (haveAddress === true) {
      setLoading(true);
      await api.put('address', {
        ...formattedAddress,
        city: 'Lagarto',
        state: 'SE',
      });
      Alert.alert('Sucesso!', 'Seu endereço foi atualizado com sucesso!');
      setLoading(false);
    } else {
      setLoading(true);
      await api.post('address', {
        ...formattedAddress,
        city: 'Lagarto',
        state: 'SE',
      });
      Alert.alert('Sucesso!', 'Endereço cadastrado  com sucesso!');
      setLoading(false);
    }
  }

  return (
    <Background>
      <Container>
        <FormContainer>
          <DeliveryAddressForm
            handleFormSubmit={handleFormSubmit}
            loading={loading}
          />
        </FormContainer>
      </Container>
    </Background>
  );
}
