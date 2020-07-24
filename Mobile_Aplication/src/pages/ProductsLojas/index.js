/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../services/api';
import { YellowBox, StyleSheet } from 'react-native';
YellowBox.ignoreWarnings(['VirtualizedLists']);
import Icons from 'react-native-vector-icons/FontAwesome5';

import Background from '../../components/Background';
import { useIsFocused } from '@react-navigation/native';
import {
  ProductList,
  ContainerCard,
  Left,
  Avatar,
  Info,
  Name,
  Time,
  TextBadge,
  Avaliacao,
  TextInfo,
} from './styles';

import { StatusBar, Alert, ActivityIndicator } from 'react-native';
import colors from '../../styles/colors';

import {
  Button,
  Container,
  Header,
  Content,
  Right,
  Separator,
  Badge,
  Text,
} from 'native-base';

import OfertasEstabelecimento from '../../components/OfertasEstabelecimentos';
import CategoriaEstabelecimento from '../../components/CategoriasEstabelecimentos';
export default function ProductsLojas({ navigation, route }) {
  StatusBar.setBackgroundColor(colors.finalisar);
  const [total, setTotal] = useState([]);
  const dispatch = useDispatch();
  const { product } = route.params;
  const [loading, setLoading] = useState(false);
  const cartSize = useSelector(state => state.cart.length);
  const isFocused = useIsFocused();
  const id = product.id;

  useEffect(() => {
    async function getData() {
      const response = await api.get(`offer_estab/${id}`);
      setTotal(response.headers['x-total-count']);
    }
    getData();
  }, []);

  return (
    <Background>
      <Container style={styles.container}>
        <Header style={styles.headerNameLoja}>
          <Button transparent textStyle={{ color: '#87838B' }}>
            <Icons name="credit-card" size={20} color="#FFF" />
            <Text>Aceitamos Cartão na entrega</Text>
          </Button>
          <Right style={styles.iconPesquisar}>
            <Button transparent>
              <Iconn
                name="magnify"
                color="#FFF"
                size={26}
                onPress={() =>
                  navigation.navigate('Search', { estabelecimento: product })
                }
              />
            </Button>
          </Right>
        </Header>

        <Button
          style={styles.buttonCart}
          onPress={() => navigation.navigate('Cart')}>
          <Iconn style={styles.iconCart} name="basket" color="#FFF" size={33} />
          {loading ? (
            <ActivityIndicator
              color="#f00"
              size={25}
              style={{ top: 20, right: 9 }}
            />
          ) : (
            <Badge style={{ marginLeft: -10, marginTop: 30 }}>
              <Text>{cartSize || 0}</Text>
            </Badge>
          )}
        </Button>

        <Content style={{ flex: 1 }}>
          <ContainerCard
            onPress={() => navigation.navigate('InfoLojas', { product })}>
            <Left>
              <Avatar
                past={product.status === 'FECHADO' ? true : false}
                source={{
                  uri: product.image.url.replace('localhost', '10.0.0.104'),
                }}
              />
              <Info>
                <Name>{product.name_loja}</Name>
                <Time> {product.tempo_entrega} min</Time>
                <Avaliacao>
                  <TextInfo note>{product.avaliacao}</TextInfo>
                  <Icons
                    name="star-half-alt"
                    size={15}
                    color="#F4A460"
                    style={{ marginLeft: 10, marginTop: 2 }}
                  />
                </Avaliacao>
              </Info>
            </Left>
            {product.status === 'ABERTO' ? (
              <Text style={styles.statusAberto}>{product.status}</Text>
            ) : (
              <Text style={styles.statusFechado}>{product.status}</Text>
            )}
          </ContainerCard>
          {total > 0 ? (
            <Separator style={styles.separator}>
              <Text style={styles.textseparator}>Ofertas do dia</Text>
            </Separator>
          ) : null}

          <OfertasEstabelecimento id={id} navigation={navigation} />
          <Separator style={styles.separator}>
            <Text style={styles.textseparator}>Categorias</Text>
          </Separator>
          <CategoriaEstabelecimento
            id={id}
            loja={product}
            navigation={navigation}
          />
        </Content>
      </Container>
    </Background>
  );
}
const styles = StyleSheet.create({
  statusAberto: {
    color: '#20B402',
  },
  statusFechado: {
    color: '#B22222',
  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  headerButton: {
    backgroundColor: '#F4A460',
    height: 60,
  },
  iconPesquisar: {
    marginRight: 20,
    marginTop: 5,
  },
  headerNameLoja: {
    backgroundColor: '#F4A460',
    height: 50,
  },

  buttonCart: {
    height: 65,
    width: 65,
    borderRadius: 70,
    borderWidth: 1,
    backgroundColor: '#F4A460',
    borderColor: '#F4A460',
    position: 'absolute',
    zIndex: 9999,
    flex: 1,

    left: 0,
    right: 0,
    bottom: 20,
  },
  iconCart: {
    marginLeft: 15,
    marginTop: -2,
  },
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
});
