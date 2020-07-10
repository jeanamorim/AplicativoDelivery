/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import storage from '@react-native-community/async-storage';
import Background from '../../components/Background';
import { useSelector } from 'react-redux';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';

import {
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
} from 'native-base';
import api from '../../services/api';
import Modal from 'react-native-modal';
import NewAddress from '../../pages/NewAdress';
export default function OfertasPrincipal({ navigation }) {
  const [endereco, setEndereco] = useState([]);
  const [adresses, setAdresses] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
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

  async function loadEndereco() {
    if (loading) {
      return;
    }
    setLoading(true);
    const response = await api.get(`address_estab/${userId}?page=${page}`);

    setEndereco([...endereco, ...response.data]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadEndereco();
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

  async function handleRemove(id) {
    setLoading(true);
    await api.delete(`/address_estab/${id}`);
    setLoading(false);
    const response = await api.get(`address_estab/${userId}`);
    setEndereco(response.data);
  }
  const toggleModal = () => {
    setVisible(!visible);
  };

  function renderItem({ item }) {
    return (
      <Content>
        {endereco.length > 0 ? (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              setVisible(false);
              gravarendereco(item);
              AtualizaEndereco();
            }}>
            <CardItem>
              <Left>
                <Icon name="home" size={18} color="#F4A460" />
                <Body>
                  <Text style={{ fontSize: 14 }}>
                    {`${item.street}, ${item.street_n} - ${item.city}`}
                  </Text>
                  <Text note>{item.neighborhood}</Text>
                  <Text note>{item.complement}</Text>
                </Body>
              </Left>
              <TouchableOpacity
                style={{ backgroundColor: '#fff', marginLeft: 20 }}
                transparent
                onPress={() => handleRemove(item.id)}>
                {loading ? (
                  <ActivityIndicator color="#F4A460" />
                ) : (
                  <Icon name="trash" size={21} color="#FF0000" />
                )}
              </TouchableOpacity>
            </CardItem>
          </TouchableOpacity>
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
                setVisible(false);
                navigation.navigate('NewAdress');
              }}
              style={{ color: '#F4A460', fontWeight: 'bold', fontSize: 16 }}>
              Cadastar agora
            </Text>
          </View>
        )}
      </Content>
    );
  }

  return (
    <Background>
      {adresses ? (
        <TouchableOpacity
          onPress={toggleModal}
          style={{ backgroundColor: '#F4A460', elevation: 5, marginTop: 2 }}>
          <ListItem>
            <Left>
              <Text
                style={{ marginLeft: -10, marginTop: -30, color: '#FF0000' }}>
                Entregar em
              </Text>

              <Text
                note
                style={{
                  marginLeft: -95,
                  marginTop: 10,
                  color: '#000000',
                }}>
                {`${adresses.street}, ${adresses.street_n} - ${adresses.city}`}
              </Text>
            </Left>
            <Right>
              <Icon
                style={{ marginTop: 10, marginLeft: 20 }}
                name="angle-down"
                size={25}
                color="#FF0000"
                onPress={() => {
                  setVisible(true);
                }}
              />
            </Right>
          </ListItem>
        </TouchableOpacity>
      ) : (
        <List
          style={{ backgroundColor: '#F4A460', elevation: 5, marginTop: 2 }}>
          <ListItem avatarz>
            <Left>
              <Text
                style={{ marginLeft: -10, marginTop: -30, color: '#FF0000' }}>
                Entregar em
              </Text>

              <Text
                note
                style={{
                  marginLeft: -95,
                  marginTop: 10,
                  color: '#000000',
                }}>
                Você precisa cadastar um endereço.
              </Text>
            </Left>
            <Right>
              <Icon
                style={{ marginTop: 10, marginLeft: 20 }}
                name="angle-down"
                size={25}
                color="#FF0000"
                onPress={() => {
                  setVisible(true);
                }}
              />
            </Right>
          </ListItem>
        </List>
      )}

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

        <FlatList
          style={{ marginTop: 30 }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={endereco}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          onEndReached={loadEndereco}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />

        <TouchableOpacity style={styles.btn} onPress={() => setVisible(false)}>
          <Text style={{ color: '#fff' }}>Sair</Text>
        </TouchableOpacity>
      </Modal>
    </Background>
  );
}
