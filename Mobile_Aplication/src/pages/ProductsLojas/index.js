/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../services/api';
import { YellowBox, Image } from 'react-native';
YellowBox.ignoreWarnings(['VirtualizedLists']);
import Icons from 'react-native-vector-icons/FontAwesome5';
import storage from '@react-native-community/async-storage';
import Background from '../../components/Background';
import * as CartActions from '../../store/modules/cart/actions';
import { ItemCount } from './styles';

import styles from './style';
import { StatusBar, Alert, BackHandler } from 'react-native';
import colors from '../../styles/colors';

import {
  Button,
  Container,
  Header,
  Content,
  Left,
  Right,
  Body,
  Text,
  View,
  Thumbnail,
  Separator,
  CardItem,
  Card,
  Icon,
} from 'native-base';

import OfertasEstabelecimento from '../../components/OfertasEstabelecimentos';
import CategoriaEstabelecimento from '../../components/CategoriasEstabelecimentos';
export default function ProductsLojas({ navigation, route }) {
  StatusBar.setBackgroundColor(colors.finalisar);
  const [quantItensCart, setQuantCart] = useState([]);
  const { product } = route.params;

  const dispatch = useDispatch();
  const id = product.id;

  useFocusEffect(() => {
    async function getData() {
      const response = await api.get(`cart/${id}`);
      setQuantCart(response.data.length);
    }
    getData();
  }, [id, product.id]);

  //---------------------------------------------------------------------------

  //---------------------------------------------------------------------------

  //------------------------------------------------------------------------------
  return (
    <Background>
      <Container style={styles.container}>
        <Header style={styles.headerNameLoja}>
          <Button transparent textStyle={{ color: '#87838B' }}>
            <Icons name="credit-card" size={20} color="#FFF" />
            <Text>Aceitamos Cartão</Text>
          </Button>
          <Right style={styles.iconPesquisar}>
            <Button transparent>
              <Iconn
                name="magnify"
                color="#FFF"
                size={26}
                onPress={() =>
                  navigation.navigate('Search', { estabelecimento: product })
                }
              />
            </Button>
          </Right>
        </Header>

        <Button
          style={styles.buttonCart}
          onPress={() =>
            navigation.navigate('Cart', {
              id: id,
            })
          }>
          <Iconn style={styles.iconCart} name="basket" color="#FFF" size={33} />
          <ItemCount>{quantItensCart || 0}</ItemCount>
        </Button>

        <Content style={{ flex: 1 }}>
          <Card
            style={{
              elevation: 5,
              flex: 1,
            }}>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{
                    uri: product.image.url.replace('localhost', '10.0.0.104'),
                  }}
                />
                <Body>
                  <Text>{product.name_loja} sera que fica bom ate</Text>
                  <Button transparent textStyle={{ color: '#87838B' }}>
                    <Icons
                      color="#F4A460"
                      name="angle-double-right"
                      size={20}
                    />
                    <Text style={{ color: '#F4A460' }}>Ver Informação</Text>
                  </Button>
                </Body>
              </Left>
            </CardItem>

            <CardItem>
              <Left>
                <Icons name="star-half-alt" size={15} color="#F4A460" />
                <Text note style={styles.avaliacaoLoja}>
                  {product.avaliacao}
                </Text>
              </Left>
              <Body>
                <Text>
                  <Icons name="clock" size={15} color="#999" />
                  <Text
                    note
                    style={{
                      fontFamily: 'CerebriSans-Regular',
                      color: '#000',
                    }}>
                    {product.tempo_entrega} min
                  </Text>
                </Text>
              </Body>
              {product.status === 'ABERTO' ? (
                <Right>
                  <Text>
                    <Text
                      note
                      style={{
                        fontFamily: 'CerebriSans-Regular',
                        color: '#20B402',
                      }}>
                      {product.status}
                    </Text>
                  </Text>
                </Right>
              ) : (
                <Right>
                  <Text>
                    <Text
                      note
                      style={{
                        fontFamily: 'CerebriSans-Regular',
                        color: '#B22222',
                      }}>
                      {product.status}
                    </Text>
                  </Text>
                </Right>
              )}
            </CardItem>
          </Card>

          <Separator style={styles.separator}>
            <Text style={styles.textseparator}>Ofertas do dia</Text>
          </Separator>
          <OfertasEstabelecimento id={id} navigation={navigation} />
          <Separator style={styles.separator}>
            <Text style={styles.textseparator}>Categorias</Text>
          </Separator>
          <CategoriaEstabelecimento
            id={id}
            loja={product}
            navigation={navigation}
          />
        </Content>
      </Container>
    </Background>
  );
}

ProductsLojas.navigationOptions = ({ navigation }) => ({
  headerTitle: () => <View />,
});
