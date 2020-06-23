/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';

import { ActivityIndicator, FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import Background from '../../components/Background';

import { formatPrice } from '../../util/format';

import styles from './styles';
import {
  Container,
  Button,
  Text,
  Header,
  Input,
  Item,
  Left,
  Body,
  Thumbnail,
  List,
  ListItem,
  Card,
} from 'native-base';
import api from '../../services/api';

export default function Search({ navigation }) {
  const [searchResult, setSearchResult] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState(false);
  const [focused, setFocused] = useState(false);

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
    async function search() {
      const response = await api.get(`products?search=${searchText}`);

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.promo_price || product.price),
      }));

      setSearchResult(data);
      setSearching(false);
    }
    if (searching) {
      search();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searching]);

  function renderProduct({ item }) {
    return (
      <Card style={styles.boxShadow}>
        <List>
          <ListItem avatar onPress={() => navigation.navigate('DetalhesItens')}>
            <Left>
              <Thumbnail
                square
                source={{
                  uri: item.image.url.replace('localhost', '10.0.0.106'),
                }}
                style={{
                  height: 64,
                  width: 64,
                  marginLeft: -10,
                  marginTop: -5,
                }}
              />
            </Left>
            <Body>
              <Text
                numberOfLines={1}
                style={{ fontFamily: 'CerebriSans-Regular' }}>
                {item.name}
              </Text>
              <Text
                note
                numberOfLines={2}
                style={{ fontFamily: 'CerebriSans-Regular' }}>
                Pizza deliciosa podendo escolher ate 2 sabores nela e se quiser
              </Text>
            </Body>
            <Text style={styles.price}>{item.priceFormatted}</Text>
          </ListItem>
        </List>
      </Card>
    );
  }

  function RenderList() {
    if (searchResult) {
      if (searchResult.length) {
        return (
          <FlatList
            data={searchResult}
            keyExtractor={item => String(item.id)}
            renderItem={renderProduct}
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
            Nenhum produto encontrado.
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
        <Header style={{ backgroundColor: '#F4A460', height: 50 }}>
          <Left>
            <Button transparent>
              <Icon
                color="#fff"
                size={25}
                name="arrow-back"
                onPress={() => navigation.navigate('ProductsLojas')}
              />
            </Button>
          </Left>
          <Body>
            <Text
              style={{
                marginLeft: 33,
                marginTop: 4,
                color: '#fff',
                fontFamily: 'CerebriSans-ExtraBold',
                fontSize: 20,
              }}>
              Buscar
            </Text>
          </Body>
        </Header>
        <Header searchBar rounded style={{ backgroundColor: '#fff' }}>
          <Item focused={focused}>
            <Input
              placeholder="Pesquisar algo..."
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
