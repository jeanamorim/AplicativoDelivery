/* eslint-disable no-unreachable */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { TouchableOpacity, View, Text, TextInput, Modal } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '../../components/Background';
import api from '../../services/api';
import { Button, Header, Left, Body, Content } from 'native-base';
import { cepMask } from '../../forms/validation/masks';
export default function BuscarCep({ navigation }) {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState([]);

  async function buscarCep(id) {
    setLoading(true);
    const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.cep !== '49400000') {
      Alert.alert('OOOPs, Ainda não estamos na sua cidade...=) =)');
    }
    setDados(response.data);
    setLoading(false);
  }

  return (
    <Background>
      <Header style={{ backgroundColor: '#F4A460', height: 50 }}>
        <Left>
          <Button transparent>
            <Icon
              color="#fff"
              size={25}
              name="arrow-back"
              onPress={() => navigation.navigate('Home')}
            />
          </Button>
        </Left>
        <Body>
          <Text
            style={{
              marginLeft: 0,
              marginTop: 4,
              color: '#fff',
              fontFamily: 'CerebriSans-ExtraBold',
              fontSize: 20,
            }}>
            Buscar CEP
          </Text>
        </Body>
      </Header>
      <View
        style={{
          flex: 2,
          marginHorizontal: 20,
          paddingVertical: 200,
        }}>
        <View style={{ flex: 1, flexdirection: 'row', marginTop: -30 }}>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>
            Informe seu CEP para cadastrar seu endereço
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderWidth: 1,
              borderColor: '#c3c3c3',
              marginTop: 10,
              height: 60,
            }}
            required
            maxLength={8}
            autoCorrect={false}
            keyboardType="numeric"
            value={cep}
            onChangeText={setCep}
            placeholder="49400-000"
            placeholderTextColor="#c3c3c3"
          />
          <TouchableOpacity
            onPress={() => {
              buscarCep();

              navigation.navigate('NewAdress', { dados: dados });
            }}
            style={{
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#F4A460',
              paddingHorizontal: 20,
              paddingVertical: 15,
              height: 50,
            }}>
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={{ color: '#fff' }}>Buscar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
}
