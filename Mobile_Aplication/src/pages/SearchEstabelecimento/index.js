/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';

import {
  ActivityIndicator,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
  CardItem,
  Right,
} from 'native-base';
import api from '../../services/api';

export default function SearchEstabelecimento({ navigation }) {
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
        key={item.id}
        onPress={() => navigation.navigate('ProductsLojas', { product: item })}>
        <Card
          key={item.id}
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
              <Text style={styles.status}>{item.status}</Text>
            </Right>
          </CardItem>
        </Card>
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
//SearchEstabelecimento.navigationOptions = {
//tabBarLabel: 'Buscar',
// tabBarIcon: ({ tintColor }) => (
// <Icon name="search" size={20} color={tintColor} />
//),
//};
