import React from 'react';

import { Container, Title, List } from './styles';
import Background from '../../components/Background';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loja from '../../components/Lojas';

const data = [1, 2, 3, 4, 5, 6];

export default function Lojas() {
  <Background>
    <Container>
      <Title>Estabelecimentos</Title>

      <List
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Loja data={item} />}
      />
    </Container>
  </Background>;
}
Lojas.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
