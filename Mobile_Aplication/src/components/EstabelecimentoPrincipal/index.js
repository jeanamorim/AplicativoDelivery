/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Image,
  ActivityIndicator,
  YellowBox,
  TouchableHighlight,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import Background from '../../components/Background';
import {
  ProductList,
  Container,
  Left,
  Avatar,
  Info,
  Name,
  Time,
  Canceled,
  Avaliacao,
  Text,
} from './styles';
import Iconn from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Button,
  Body,
  CardItem,
  Thumbnail,
  Right,
  Card,
  View,
} from 'native-base';
import api from '../../services/api';

export default function EstabelecimentoPrincipal({ navigation }) {
  const [estabelecimento, setEstabelecimento] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  async function loadEstabelecimentos() {
    if (loading) {
      return;
    }

    if (total > 0 && estabelecimento.length === total) {
      return;
    }

    const response = await api.get(`estabelecimento?page=${page}`);

    setEstabelecimento([...estabelecimento, ...response.data]);
    setPage(page + 1);
    setTotal(response.headers['x-total-count']);
  }

  useEffect(() => {
    loadEstabelecimentos();
  }, []);

  function renderFooter() {
    if (loading) {
      return null;
    }
    return (
      <View style={{ alignSelf: 'center', marginVertical: 20 }}>
        <ActivityIndicator size={35} color="#F4A460" />
      </View>
    );
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductsLojas', { product: item })}>
        <Container>
          <Left>
            <Avatar
              past={item.status === 'FECHADO' ? true : false}
              source={{
                uri: item.image.url.replace('localhost', '10.0.0.104'),
              }}
            />
            <Info>
              <Name>{item.name_loja}</Name>
              <Time> {item.tempo_entrega} min</Time>
              <Avaliacao>
                <Text note>{item.avaliacao}</Text>
                <Icon
                  name="star-half-alt"
                  size={15}
                  color="#F4A460"
                  style={{ marginLeft: 10, marginTop: 2 }}
                />
              </Avaliacao>
            </Info>
          </Left>
          {item.status === 'ABERTO' ? (
            <Text style={styles.statusAberto}>{item.status}</Text>
          ) : (
            <Text style={styles.statusFechado}>{item.status}</Text>
          )}
        </Container>
      </TouchableOpacity>
    );
  }

  return (
    <Background>
      <ProductList
        contentContainerStyle={{ paddingHorizontal: 2 }}
        data={estabelecimento}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        onEndReached={loadEstabelecimentos}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
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

  avatar: {
    position: 'absolute',
    borderWidth: 2,
    height: 90,
    width: 90,
    borderRadius: 50,
    borderColor: '#fff',
  },
  nameestabelecimento: {
    marginTop: 87,
    position: 'absolute',

    color: '#fff',

    textTransform: 'uppercase',
    fontFamily: 'CerebriSans-ExtraBold',
  },
});
