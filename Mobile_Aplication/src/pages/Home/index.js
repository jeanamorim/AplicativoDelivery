/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Background from '../../components/Background';
import { StatusBar, YellowBox, StyleSheet } from 'react-native';
import api from '../../services/api';
import colors from '../../styles/colors';
import CategorioPrincipal from '../../components/CategoriaPrincipal';
import OfertasPrincipal from '../../components/OfertasPrincipal';
import BannerHome from '../Banner';
import EstabelecimentoPrincipal from '../../components/EstabelecimentoPrincipal';
import { Container, Header, Text, Content, Separator } from 'native-base';

YellowBox.ignoreWarnings(['VirtualizedLists']);
export default function Home({ navigation }) {
  StatusBar.setBackgroundColor(colors.finalisar);
  const [count, setCount] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await api.get('/offersGeral');
      setCount(response.headers['x-total-count']);
    }
    getData();
  }, []);

  return (
    <Background>
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Text style={styles.titulo}>Blipe</Text>
        </Header>
        <Content>
          <BannerHome />
          <CategorioPrincipal navigation={navigation} />
          {count > 0 ? (
            <Separator style={styles.separator}>
              <Text style={styles.textseparator}>Ofertas do dia</Text>
            </Separator>
          ) : null}
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
const styles = StyleSheet.create({
  separator: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#fff',
    marginLeft: 3,
    marginRight: 3,
  },
  textseparator: {
    fontSize: 17,
    fontFamily: 'CerebriSans-ExtraBold',
    color: '#000',
  },
  titulo: {
    marginTop: 7,
    color: '#fff',
    fontFamily: 'CerebriSans-ExtraBold',
    fontSize: 30,
  },
  header: {
    backgroundColor: '#F4A460',
    height: 50,
  },
  container: {
    flex: 1,
  },
});
