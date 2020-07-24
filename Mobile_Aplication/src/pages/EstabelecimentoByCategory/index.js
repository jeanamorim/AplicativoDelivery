/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';

import {
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../services/api';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import Background from '../../components/Background';

import {
  Container,
  Button,
  Header,
  Input,
  Item,
  Content,
  Right,
  Body,
  Title,
  View,
  Thumbnail,
  List,
  ListItem,
  Separator,
  CardItem,
  Card,
  Footer,
  FooterTab,
} from 'native-base';

import {
  ProductList,
  Containerr,
  Left,
  Avatar,
  Info,
  Time,
  Canceled,
  Avaliacao,
  Text,
  NameLoja,
} from './styles';

export default function EstabelecimentoByCategory({ navigation, route }) {
  const [estabelecimento, setEstabelecimento] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { Name } = route.params;

  async function loadEstabelecimentos() {
    setIsVisible(true);
    if (loading) {
      return;
    }

    const response = await api.get(
      `buscarestabelecimento?category=${Name}&page=${page}`,
    );
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
        <Containerr>
          <Left>
            <ShimmerPlaceHolder
              autoRun={true}
              visible={isVisible}
              style={{ width: 80, height: 80, borderRadius: 50 }}>
              <Avatar
                past={item.status === 'FECHADO' ? true : false}
                source={{
                  uri: item.image.url.replace('localhost', '10.0.0.104'),
                }}
              />
            </ShimmerPlaceHolder>

            <Info>
              <ShimmerPlaceHolder
                autoRun={true}
                visible={isVisible}
                style={{ width: 180 }}>
                <Text>{item.name_loja}</Text>
              </ShimmerPlaceHolder>
              <ShimmerPlaceHolder
                autoRun={true}
                visible={isVisible}
                style={{ width: 90, margin: 1 }}>
                <Time> {item.tempo_entrega} min</Time>
              </ShimmerPlaceHolder>
              <ShimmerPlaceHolder
                autoRun={true}
                visible={isVisible}
                style={{ width: 60, margin: 1 }}>
                <Avaliacao>
                  <Text note>{item.avaliacao}</Text>
                  <Icon
                    name="star-half-alt"
                    size={15}
                    color="#F4A460"
                    style={{ marginLeft: 10, marginTop: 2 }}
                  />
                </Avaliacao>
              </ShimmerPlaceHolder>
            </Info>
          </Left>
          <ShimmerPlaceHolder
            autoRun={true}
            visible={isVisible}
            style={{ width: 80 }}>
            {item.status === 'ABERTO' ? (
              <Text style={styles.statusAberto}>{item.status}</Text>
            ) : (
              <Text style={styles.statusFechado}>{item.status}</Text>
            )}
          </ShimmerPlaceHolder>
        </Containerr>
      </TouchableOpacity>
    );
  }

  return (
    <Background>
      <Container>
        <Header style={{ backgroundColor: '#F4A460', height: 50 }}>
          <NameLoja>{Name}</NameLoja>
        </Header>

        <ProductList
          contentContainerStyle={{ paddingHorizontal: 2 }}
          data={estabelecimento}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          onEndReached={loadEstabelecimentos}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
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

  avatar: {
    position: 'absolute',
    borderWidth: 2,
    height: 90,
    width: 90,
    borderRadius: 50,
    borderColor: '#fff',
  },
});
