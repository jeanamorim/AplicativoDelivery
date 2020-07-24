/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';

import { TouchableOpacity } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import { View, Text } from 'native-base';
export default function ModalComfirmation({ navigation, visible }) {
  <Modal isVisible={visible} style={styles.modal}>
    <View style={styles.title}>
      <Text
        style={{
          color: '#F4A460',
          marginTop: 15,
          marginLeft: 20,
          fontSize: 20,
        }}>
        Você possui produtos de outro estabelecimento. Deseja removê-los?
      </Text>
    </View>

    <TouchableOpacity style={styles.btn}>
      <Text style={{ color: '#fff' }}>Sim</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.btn}>
      <Text style={{ color: '#fff' }}>Não</Text>
    </TouchableOpacity>
  </Modal>;
}
