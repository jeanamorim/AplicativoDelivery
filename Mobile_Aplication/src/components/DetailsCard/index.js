import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Container, Header, HeaderTitle, Label, Text } from './styles';

export default function DetailsCard({ orderDetails, name }) {
  return (
    <Container>
      <Header>
        <Icon name="truck" color="#f4a460" size={27} />
        <HeaderTitle>Informações da entrega</HeaderTitle>
      </Header>
      <Label>Loja</Label>

      <Label>Endereço de entrega</Label>
      <Text>
        {`${orderDetails.ship_street}, ${orderDetails.ship_street_n} - ${
          orderDetails.ship_city
        }\n${orderDetails.ship_neighborhood}`}
      </Text>
      <Label>Produto</Label>
      <Text>ok</Text>
    </Container>
  );
}
