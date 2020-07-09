/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';

import {
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import storage from '@react-native-community/async-storage';
import Background from '../../../components/Background';
import { useSelector } from 'react-redux';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  Text,
  Body,
  Left,
  Right,
  List,
  ListItem,
  View,
  Content,
  CardItem,
  Card,
} from 'native-base';
import api from '../../../services/api';
import Modal from 'react-native-modal';

export default function EnderecoComfirmation({ navigation }) {
  const [endereco, setEndereco] = useState([]);
  const [adresses, setAdresses] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const userId = useSelector(state => state.user.profile.id);

  async function gravarendereco(adress) {
    try {
      await storage.multiSet([
        [`KEY_VALUE_ID/${userId}`, JSON.stringify(adress)],
      ]);
    } catch (error) {
      Alert.alert('Error:', error.message);
    }
  }

  useEffect(() => {
    async function BuscarEndereco() {
      try {
        const response = JSON.parse(
          await storage.getItem(`KEY_VALUE_ID/${userId}`),
        );
        setAdresses(response);
      } catch (error) {
        Alert.alert('Error:', error.message);
      }
    }

    BuscarEndereco();
  }, [userId]);

  async function AtualizaEndereco() {
    try {
      const response = JSON.parse(
        await storage.getItem(`KEY_VALUE_ID/${userId}`),
      );

      setAdresses(response);
    } catch (error) {
      Alert.alert('Error:', error.message);
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

  async function handleRemove(id) {
    setLoading(true);
    await api.delete(`/address_estab/${id}`);
    setLoading(false);
    const response = await api.get(`address_estab/${userId}`);
    setEndereco(response.data);
  }

  return (
    <Background>
      <Card
        style={{
          backgroundColor: '#fff',
          elevation: 5,
          marginTop: 8,
          maxHeight: 130,
          minHeight: 130,
          borderColor: '#000',
          borderWidth: 2,
        }}>
        <ListItem>
          <List>
            <Text style={{ marginLeft: -14, marginTop: -60, color: '#FF0000' }}>
              Entregar em
            </Text>
          </List>
          <Left>
            <Text
              note
              style={{
                marginLeft: -95,
                marginTop: 30,
                color: '#000000',
              }}>
              {`${adresses.street},${adresses.street_n} - ${adresses.city}\n${
                adresses.neighborhood
              }\n${adresses.complement}\n${adresses.reference}`}
            </Text>
          </Left>
          <Right>
            <Icon
              style={{ marginTop: 10, marginLeft: 20 }}
              name="angle-down"
              size={35}
              color="#FF0000"
              onPress={() => {
                setVisible(true);
              }}
            />
          </Right>
        </ListItem>
      </Card>
      <Modal isVisible={visible} style={styles.modal}>
        <View style={styles.title}>
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
              setVisible(false);
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
          <ScrollView>
            {endereco.map(adresse => (
              <TouchableOpacity
                key={adresse.id}
                onPress={() => {
                  setVisible(false);
                  gravarendereco(adresse);
                  AtualizaEndereco();
                }}>
                <CardItem key={adresse.id}>
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
                    </Body>
                  </Left>
                  <TouchableOpacity
                    style={{ backgroundColor: '#fff', marginLeft: 20 }}
                    transparent
                    onPress={() => handleRemove(adresse.id)}>
                    {loading ? (
                      <ActivityIndicator color="#F4A460" />
                    ) : (
                      <Icon name="trash" size={21} color="#FF0000" />
                    )}
                  </TouchableOpacity>
                </CardItem>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Content>

        <TouchableOpacity style={styles.btn} onPress={() => setVisible(false)}>
          <Text style={{ color: '#fff' }}>Sair</Text>
        </TouchableOpacity>
      </Modal>
    </Background>
  );
}
