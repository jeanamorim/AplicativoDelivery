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
import { ProductList } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Button,
  Text,
  Body,
  CardItem,
  Thumbnail,
  Left,
  Right,
  Card,
  View,
  Container,
} from 'native-base';
import api from '../../services/api';

export default function EstabelecimentoPrincipal({ navigation }) {
  const [estabelecimento, setEstabelecimento] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  async function loadEstabelecimentos() {
    if (loading) {
      return;
    }

    const response = await api.get(`estabelecimento?page=${page}`);

    setEstabelecimento([...estabelecimento, ...response.data]);
    setPage(page + 1);
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
        <Card
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri:
                'https://www.popeyesbrasil.com.br/assets/products/hero/hero_combo_lanches.jpg',
            }}
            style={{
              height: 110,
              flex: 1,
              width: '100%',
            }}
          />

          <Thumbnail
            large
            source={{
              uri: item.image.url.replace('localhost', '10.0.0.104'),
            }}
            style={styles.avatar}
          />
          <Text style={styles.nameestabelecimento}>{item.name_loja}</Text>

          <CardItem>
            <Left>
              <Icon name="star-half-alt" size={15} color="#F4A460" />
              <Text note style={{ fontFamily: 'CerebriSans-Regular' }}>
                {item.avaliacao}
              </Text>
            </Left>
            <Body>
              <Text>
                <Icon name="clock" size={15} color="#999" />
                <Text note style={{ fontFamily: 'CerebriSans-Regular' }}>
                  {item.tempo_entrega} min
                </Text>
              </Text>
            </Body>
            <Right>
              {item.status === 'ABERTO' ? (
                <Text style={styles.statusAberto}>{item.status}</Text>
              ) : (
                <Text style={styles.statusFechado}>{item.status}</Text>
              )}
            </Right>
          </CardItem>
        </Card>
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
    flex: 1,
    color: '#20B402',
    fontFamily: 'CerebriSans-Regular',
  },
  statusFechado: {
    flex: 1,
    color: '#B22222',
    fontFamily: 'CerebriSans-Regular',
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
