import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import { ProductList } from './styles';

export default function InfoLojas({ route }) {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: product.image.url.replace('localhost', '10.0.0.104'),
          }}
          style={styles.image}
        />
        <Text style={styles.headerText}>
          Telefone: <Text style={styles.headerTextBold}>{product.phone}</Text>.
        </Text>
      </View>
      <Text style={styles.title}>{product.name_loja}</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia. A melho loha da regiao de
        lagartop.
      </Text>
      <View style={styles.incidentList}>
        <View style={styles.incident}>
          <Text style={styles.incidentProperty}>CARTÕES ACEITO:</Text>
        </View>
      </View>
      <View style={styles.incidentList}>
        <View style={styles.incident}>
          <Text style={styles.incidentProperty}>ENDEREÇO:</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#F4A460',
  },

  headerText: {
    fontSize: 15,
    color: '#737380',
  },

  headerTextBold: {
    fontWeight: 'bold',
  },

  title: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 30,
    color: '#13131a',
    fontWeight: 'bold',
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#737380',
  },

  incidentList: {
    marginTop: 32,
  },

  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
    flexDirection: 'row',
  },

  incidentProperty: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold',
  },

  incidentValue: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    color: '#737380',
  },

  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  detailsButtonText: {
    color: '#e02041',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
