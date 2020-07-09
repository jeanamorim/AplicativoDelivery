/* eslint-disable no-unreachable */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';

import { TouchableOpacity, View, TextInput, Modal } from 'react-native';
import { formatPrice } from '../../../util/format';
import Background from '../../../components/Background';
import { Text, Footer, FooterTab, Button } from 'native-base';
export default function Troco({ navigation, route }) {
  const [troco, setTroco] = useState('');
  const { orderDetails, paymentMethod } = route.params;
  console.tron.log(orderDetails);
  return (
    <Background>
      <View
        style={{
          flex: 2,
          marginHorizontal: 20,
          paddingVertical: 200,
        }}>
        <View style={{ flex: 1, flexdirection: 'row' }}>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>
            Seu pedido deu
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 20, color: '#F4A460' }}>
            {orderDetails.total}
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>
            vai querer troco para quanto?
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
            value={troco}
            onChangeText={setTroco}
            placeholder="Digite em branco caso não precise."
            placeholderTextColor="#c3c3c3"
          />
        </View>
      </View>
      <Footer>
        <FooterTab style={{ backgroundColor: '#F4A460' }}>
          <Button
            onPress={() =>
              navigation.navigate('DeliveryAddress', {
                paymentMethod: paymentMethod,
                troco: troco,
              })
            }>
            <Text style={{ fontSize: 15, color: '#fff' }}>Comfirmar</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Background>
  );
}
