/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';

import {
  ActivityIndicator,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import Background from '../../components/Background';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { formatPrice } from '../../util/format';
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
} from './styles';
import {
  Container,
  Button,
  Header,
  Input,
  Item,
  Body,
  Thumbnail,
  List,
  ListItem,
  Card,
  CardItem,
  Right,
} from 'native-base';
import api from '../../services/api';

export default function SearchEstabelecimento({ navigation }) {
  const [searchResult, setSearchResult] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const timerRef = useRef();

  function handleChangeText(text) {
    setSearching(false);
    setSearchText(text);

    timerRef.current && clearTimeout(timerRef.current);

    if (text.length > 1) {
      timerRef.current = setTimeout(() => setSearching(true), 500);
    }
  }
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 500);
  }, []);

  useEffect(() => {
    async function search() {
      const response = await api.get(
        `buscarestabelecimento?search=${searchText}`,
      );
      console.tron.log(response.data);
      setSearchResult(response.data);
      setSearching(false);
    }
    if (searching) {
      search();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searching]);

  function renderData({ item }) {
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
  function RenderList() {
    if (searchResult) {
      if (searchResult.length) {
        return (
          <FlatList
            data={searchResult}
            keyExtractor={item => String(item.id)}
            renderItem={renderData}
          />
        );
      }

      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -90,
          }}>
          <Iconn name="emoticon-sad-outline" size={85} color="#CFCFCF" />
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            Nenhum estabelecimento encontrado.
          </Text>
          <Text style={{ color: '#F4A460', fontWeight: 'bold', fontSize: 16 }}>
            Verifique sua busca e tente novamente.
          </Text>
        </View>
      );
    }

    return null;
  }

  return (
    <Background>
      <Container>
        <Header span style={{ backgroundColor: '#F4A460', height: 60 }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'CerebriSans-ExtraBold',
              fontSize: 20,
              alignSelf: 'center',
            }}>
            Buscar estabelecimento
          </Text>
        </Header>
        <Header searchBar rounded style={{ backgroundColor: '#fff' }}>
          <Item focused={focused}>
            <Input
              placeholder="Pesquisar estabelecimento..."
              onChangeText={handleChangeText}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              value={searchText}
              style={{
                borderRadius: 6,
                borderColor: '#F7F6F6',
                borderWidth: 1,
                borderStyle: 'solid',
                height: 39,
                width: 47,
                fontFamily: 'CerebriSans-Regular',
              }}
            />
            <Button
              rounded
              onChangeText={handleChangeText}
              style={{
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 5,
                height: 39,
                width: 47,
                borderColor: '#F7F6F6',
                borderWidth: 1,
                borderStyle: 'solid',
              }}>
              <Icon name="search" size={25} color="#F4A460" />
            </Button>
          </Item>
        </Header>
        {searching && <ActivityIndicator size={50} color="#F4A460" />}
        <RenderList />
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
  nameestabelecimento: {
    marginTop: 87,
    position: 'absolute',

    color: '#fff',

    textTransform: 'uppercase',
    fontFamily: 'CerebriSans-ExtraBold',
  },
});
