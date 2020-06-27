/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';

import { YellowBox, Image } from 'react-native';
YellowBox.ignoreWarnings(['VirtualizedLists']);
import Icons from 'react-native-vector-icons/FontAwesome5';
import storage from '@react-native-community/async-storage';
import Background from '../../components/Background';

import { ItemCount } from './styles';

import styles from './style';
import { StatusBar } from 'react-native';
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
import { formatPrice } from '../../util/format';
import OfertasEstabelecimento from '../../components/OfertasEstabelecimentos';
import CategoriaEstabelecimento from '../../components/CategoriasEstabelecimentos';
export default function ProductsLojas({ navigation, route }) {
  StatusBar.setBackgroundColor(colors.finalisar);
  const { product } = route.params;
  const cartSize = useSelector(state => state.cart.length);
  const id = product.id;
  console.tron.log(id);
  useEffect(() => {
    async function loadId() {
      try {
        await storage.setItem('KEY_VALUE_ID_ESTABELECIMENTO', id.toString());
      } catch (err) {
        if (err.response) {
          console.tron.log('Erro no servidor');
        } else {
          console.tron.log('Falha ao conectar com o servidor');
        }
      }
    }

    loadId();
  }, [id]);

  return (
    <Background>
      <Container style={styles.container}>
        <Header span style={styles.headerButton}>
          <Left>
            <Button transparent>
              <Icon
                size={25}
                name="arrow-back"
                onPress={() => navigation.goBack()}
              />
            </Button>
          </Left>
          <Right style={styles.iconPesquisar}>
            <Button transparent>
              <Iconn
                name="magnify"
                color="#FFF"
                size={26}
                onPress={() => navigation.navigate('Search')}
              />
            </Button>
          </Right>
        </Header>

        <Header style={styles.headerNameLoja}>
          <Text style={styles.nameLoja}>{product.name_loja}</Text>
        </Header>

        <Button
          style={styles.buttonCart}
          onPress={() => navigation.navigate('Cart')}>
          <Iconn style={styles.iconCart} name="basket" color="#FFF" size={33} />
          <ItemCount>{cartSize || 0}</ItemCount>
        </Button>

        <Content style={{ flex: 1 }}>
          <Card
            style={{
              flex: 1,
            }}>
            <Image
              source={{
                uri: product.image.url.replace('localhost', '10.0.0.106'),
              }}
              style={styles.imageGrande}
            />

            <Thumbnail
              large
              source={{
                uri: product.image.url.replace('localhost', '10.0.0.106'),
              }}
              style={styles.avatar}
            />
            <Text numberOfLines={2} style={styles.descricaoLoja}>
              "Nova pizzaria. Nosso lema é qualidade um bom atendimento e preço
              baixo fdfcedefefeedsde."
            </Text>

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
