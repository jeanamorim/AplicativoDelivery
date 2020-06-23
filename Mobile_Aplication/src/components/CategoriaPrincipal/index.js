/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView } from 'react-native';
import Background from '../../components/Background';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, Body } from 'native-base';

export default function CategoriaPrincipal({ navigation }) {
  return (
    <Background>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}>
        <Body>
          <Button rounded style={styles.categoryButton}>
            <Icon
              name="store"
              size={25}
              color="#F4A460"
              onPress={() => navigation.navigate('EstabelecimentoByCategory')}
            />
          </Button>
          <Text
            note
            style={{
              fontSize: 10,
              color: '#F4A460',
              fontFamily: 'CerebriSans-Regular',
            }}>
            Mercado
          </Text>
        </Body>

        <Body>
          <Button
            onPress={() => navigation.navigate('EstabelecimentoByCategory')}
            rounded
            style={styles.categoryButton}>
            <Icon name="pizza-slice" size={25} color="#F4A460" />
          </Button>
          <Text
            note
            style={{
              fontSize: 10,
              color: '#F4A460',
              fontFamily: 'CerebriSans-Regular',
            }}>
            Pizzarias
          </Text>
        </Body>

        <Body>
          <Button
            rounded
            style={styles.categoryButton}
            onPress={() =>
              navigation.navigate('EstabelecimentoByCategory', {
                Name: 'LANCHES',
              })
            }>
            <Icons name="food" size={25} color="#F4A460" />
          </Button>
          <Text
            note
            style={{
              fontSize: 10,
              color: '#F4A460',
              fontFamily: 'CerebriSans-Regular',
            }}>
            Lanches
          </Text>
        </Body>

        <Body>
          <Button
            rounded
            style={styles.categoryButton}
            onPress={() => navigation.navigate('EstabelecimentoByCategory')}>
            <Icon name="glass-cheers" size={25} color="#F4A460" />
          </Button>
          <Text
            note
            style={{
              fontSize: 10,
              color: '#F4A460',
              fontFamily: 'CerebriSans-Regular',
            }}>
            Bebidas
          </Text>
        </Body>

        <Body>
          <Button
            rounded
            style={styles.categoryButton}
            onPress={() => navigation.navigate('EstabelecimentoByCategory')}>
            <Icon name="gulp" size={25} color="#F4A460" />
          </Button>
          <Text
            note
            style={{
              fontSize: 10,
              color: '#F4A460',
              fontFamily: 'CerebriSans-Regular',
            }}>
            Agua e gás
          </Text>
        </Body>

        <Body>
          <Button
            rounded
            style={styles.categoryButton}
            onPress={() => navigation.navigate('EstabelecimentoByCategory')}>
            <Icon name="ice-cream" size={25} color="#F4A460" />
          </Button>
          <Text
            note
            style={{
              fontSize: 10,
              color: '#F4A460',
              fontFamily: 'CerebriSans-Regular',
            }}>
            Gelados
          </Text>
        </Body>
        <Body>
          <Button
            rounded
            style={styles.categoryButton}
            onPress={() => navigation.navigate('EstabelecimentoByCategory')}>
            <Icon name="gifts" size={25} color="#F4A460" />
          </Button>
          <Text
            note
            style={{
              fontSize: 10,
              color: '#F4A460',
              fontFamily: 'CerebriSans-Regular',
            }}>
            Variedades
          </Text>
        </Body>
        <Body>
          <Button
            rounded
            style={styles.categoryButton}
            onPress={() => navigation.navigate('EstabelecimentoByCategory')}>
            <Icon name="birthday-cake" size={25} color="#F4A460" />
          </Button>
          <Text
            note
            style={{
              fontSize: 10,
              color: '#F4A460',
              fontFamily: 'CerebriSans-Regular',
            }}>
            Sobremesa
          </Text>
        </Body>
      </ScrollView>
    </Background>
  );
}
