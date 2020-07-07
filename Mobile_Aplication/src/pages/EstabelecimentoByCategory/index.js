/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';

import { TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../services/api';

import Background from '../../components/Background';

import {
  Container,
  Button,
  Header,
  Input,
  Item,
  Text,
  Content,
  Left,
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

import styles from './styles';

export default function EstabelecimentoByCategory({ navigation, route }) {
  const [estabelecimento, setEstabelecimento] = useState([]);

  const { Name } = route.params;
  useEffect(() => {
    async function loadData() {
      const response = await api.get(`buscarestabelecimento?category=${Name}`);

      setEstabelecimento(response.data);
    }

    loadData();
  }, [Name]);
  console.tron.log(estabelecimento.length);
  return (
    <Background>
      <Container>
        <Header style={{ backgroundColor: '#F4A460', height: 50 }}>
          <Text
            style={{
              marginTop: -5,
              color: '#fff',
              fontFamily: 'CerebriSans-ExtraBold',
              fontSize: 20,
            }}>
            {Name}
          </Text>
        </Header>
        {estabelecimento.length > 0 ? (
          <Content>
            {estabelecimento.map(loja => (
              <TouchableOpacity
                key={loja.id}
                onPress={() =>
                  navigation.navigate('ProductsLojas', { product: loja })
                }>
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
                      uri: loja.image.url.replace('localhost', '10.0.0.104'),
                    }}
                    style={styles.avatar}
                  />
                  <Text style={styles.nameestabelecimento}>
                    {loja.name_loja}
                  </Text>

                  <CardItem>
                    <Left>
                      <Icon name="star-half-alt" size={15} color="#F4A460" />
                      <Text note style={{ fontFamily: 'CerebriSans-Regular' }}>
                        {loja.avaliacao}
                      </Text>
                    </Left>
                    <Body>
                      <Text>
                        <Icon name="clock" size={15} color="#999" />
                        <Text
                          note
                          style={{ fontFamily: 'CerebriSans-Regular' }}>
                          {loja.tempo_entrega} min
                        </Text>
                      </Text>
                    </Body>
                    <Right>
                      <Text style={styles.status}>{loja.status}</Text>
                    </Right>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            ))}
          </Content>
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Iconn name="emoticon-sad-outline" size={85} color="#CFCFCF" />
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              Nenhum estabelecimento por aqui ainda...
            </Text>
            <Text
              onPress={() => navigation.goBack()}
              style={{ color: '#F4A460', fontWeight: 'bold', fontSize: 16 }}>
              Voltar
            </Text>
          </View>
        )}
      </Container>
    </Background>
  );
}
