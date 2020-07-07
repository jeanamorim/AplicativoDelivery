/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Background from '../../../components/Background';
import api from '../../../services/api';
import storage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import {
  Container,
  Button,
  Text,
  Body,
  Left,
  Right,
  List,
  ListItem,
  View,
  Content,
  CardItem,
  Header,
} from 'native-base';

export default function DeliveryAddress({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [endereco, setEndereco] = useState([]);
  const userId = useSelector(state => state.user.profile.id);
  const { orderDetails } = route.params;

  async function gravarendereco(endereco) {
    try {
      await storage.multiSet([
        ['KEY_VALUE_ADRESS_ENTREGA', JSON.stringify(endereco)],
      ]);
    } catch (err) {
      if (err.response) {
        console.tron.log('Erro no servidor');
      } else {
        console.tron.log('Falha ao conectar com o servidor');
      }
    }
  }

  useEffect(() => {
    async function checkHaveAddress() {
      setLoading(true);
      const response = await api.get(`address_estab/${userId}`);
      setLoading(false);
      setEndereco(response.data);
    }

    checkHaveAddress();
  }, [userId]);

  //useEffect(() => {
  //  setTimeout(() => setIsVisible(true), 2000);
  // }, []);

  return (
    <Background>
      <Container>
        <View
          style={{
            backgroundColor: '#fff',
            height: 50,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            elevation: 5,
          }}>
          <Text
            style={{
              color: '#F4A460',
              marginTop: 15,
              marginLeft: 20,
              fontSize: 20,
            }}>
            Entregar onde?
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('NewAdress');
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              marginTop: -25,
              marginLeft: 240,
              backgroundColor: '#F4A460',
              width: 140,
            }}>
            <Text style={{ color: '#fff' }}>Adicionar novo</Text>
          </TouchableOpacity>
        </View>
        <Content>
          {endereco.length > 0 ? (
            <ScrollView>
              {endereco.map(adresse => (
                <TouchableOpacity
                  key={adresse.id}
                  onPress={() => {
                    navigation.navigate('PaymentMethod', {
                      orderDetails,
                    });
                    gravarendereco(adresse);
                  }}>
                  <CardItem style={{ marginTop: 2 }}>
                    <Left>
                      <Icon name="home" size={18} color="#F4A460" />
                      <Body>
                        <Text style={{ fontSize: 14 }}>
                          {`${adresse.street}, ${adresse.street_n} - ${
                            adresse.city
                          }`}
                        </Text>
                        <Text note>{adresse.neighborhood}</Text>
                        <Text note>{adresse.complement}</Text>
                        <Text style={{ color: '#F4A460' }}>
                          Frete: R$ 10,00
                        </Text>
                      </Body>
                    </Left>
                    {loading ? (
                      <ActivityIndicator color="#F4A460" />
                    ) : (
                      <Text style={{ color: '#F4A460' }}>Selecionar</Text>
                    )}
                  </CardItem>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <View
              style={{
                marginTop: 200,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Iconn name="emoticon-sad-outline" size={85} color="#CFCFCF" />
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                Nenhum endereço para entrega cadastrado...
              </Text>

              <Text
                onPress={() => {
                  navigation.navigate('NewAdress');
                }}
                style={{ color: '#F4A460', fontWeight: 'bold', fontSize: 16 }}>
                Cadastar agora
              </Text>
            </View>
          )}
        </Content>
      </Container>
    </Background>
  );
}
