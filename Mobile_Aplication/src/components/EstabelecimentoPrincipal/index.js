/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import Background from '../../components/Background';
import styles from './styles';
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
} from 'native-base';
import api from '../../services/api';

export default function EstabelecimentoPrincipal({ navigation }) {
  const [estabelecimento, setEstabelecimento] = useState([]);

  useEffect(() => {
    async function loadEstabelecimentos() {
      const response = await api.get('estabelecimento');

      setEstabelecimento(response.data);
    }
    loadEstabelecimentos();
  }, []);

  return (
    <Background>
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
            <Text style={styles.nameestabelecimento}>{loja.name_loja}</Text>

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
                  <Text note style={{ fontFamily: 'CerebriSans-Regular' }}>
                    {loja.tempo_entrega} min
                  </Text>
                </Text>
              </Body>
              <Right>
                {loja.status === 'ABERTO' ? (
                  <Text style={styles.statusAberto}>{loja.status}</Text>
                ) : (
                  <Text style={styles.statusFechado}>{loja.status}</Text>
                )}
              </Right>
            </CardItem>
          </Card>
        </TouchableOpacity>
      ))}
    </Background>
  );
}
