import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Background from '../../components/Background';
import { StatusBar, YellowBox } from 'react-native';

import colors from '../../styles/colors';
import CategorioPrincipal from '../../components/CategoriaPrincipal';
import OfertasPrincipal from '../../components/OfertasPrincipal';
import EstabelecimentoPrincipal from '../../components/EstabelecimentoPrincipal';
import EnderecoPrincipal from '../../components/EnderecoPrincipal';
import { Container, Header, Text, Content, Separator } from 'native-base';
import styles from './styles';
YellowBox.ignoreWarnings(['VirtualizedLists']);
export default function Home({ navigation }) {
  StatusBar.setBackgroundColor(colors.finalisar);

  return (
    <Background>
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Text style={styles.titulo}>Meu Delivery</Text>
        </Header>
        <Content>
          <CategorioPrincipal navigation={navigation} />
          <Separator style={styles.separator}>
            <Text style={styles.textseparator}>Ofertas do dia</Text>
          </Separator>
          <OfertasPrincipal navigation={navigation} />
          <Separator style={styles.separator}>
            <Text style={styles.textseparator}>Estabelecimentos</Text>
          </Separator>
          <EstabelecimentoPrincipal navigation={navigation} />
        </Content>
      </Container>
    </Background>
  );
}
