/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import translate, { dateLanguage } from '../../../locales';
import { TouchableOpacity, ScrollView } from 'react-native';
import { formatPrice } from '../../../util/format';
import DetailsCard from '../../../components/DetailsCard';
import Table from '../../../components/Table';
import Background from '../../../components/Background';

import {
  Container,
  Card,
  CardHeader,
  CardTitle,
  Title,
  Subtitle,
  DateRow,
  DateContainer,
  Line,
  StatusContainer,
  LabelContainer,
  DotPendente,
  DotProducao,
  DotEnviado,
  DotCancelado,
  DotEntregue,
  LabelPendente,
  LabelProducao,
  LabelEnviado,
  LabelEntregue,
  LabelCancelado,
  HeaderBackground,
} from './styles';
import {
  Header,
  Text,
  Left,
  Body,
  Thumbnail,
  List,
  ListItem,
  Button,
  Footer,
  FooterTab,
  Right,
} from 'native-base';

export default function OrderDetails({ navigation, route }) {
  const { order } = route.params;
  const [orderDetails, setOrderDetails] = useState({});
  const pendente = orderDetails.status === 'PENDENTE' ? 'PENDENTE' : null;
  const producao = orderDetails.status === 'PRODUCAO' ? 'PRODUCAO' : null;
  const enviado = orderDetails.status === 'ENVIADO' ? 'ENVIADO' : null;
  const entregue = orderDetails.status === 'ENTREGUE' ? 'ENTREGUE' : null;
  const cancelado = orderDetails.status === 'CANCELADO' ? 'CANCELADO' : null;

  console.tron.log(order);
  useEffect(() => {
    const orderDetailsFormatted = {
      ...order,
      dateFormatted: format(parseISO(order.date), 'PPPpp', {
        locale: dateLanguage,
      }),
    };
    setOrderDetails(orderDetailsFormatted);
  }, [navigation, order]);

  return (
    <Background>
      <Container>
        <StatusContainer>
          <LabelContainer>
            <DotPendente filled={pendente}>
              <Icon
                size={40}
                name="clipboard-list"
                color="#000"
                style={{ alignSelf: 'center', marginTop: 6 }}
              />
            </DotPendente>
            {pendente === null ? (
              <LabelPendente />
            ) : (
              <LabelPendente>Pendente</LabelPendente>
            )}
          </LabelContainer>

          <LabelContainer>
            <DotProducao filled={producao}>
              <Icon
                size={40}
                name="house-damage"
                color="#000"
                style={{ alignSelf: 'center', marginTop: 6 }}
              />
            </DotProducao>
            {producao === null ? (
              <LabelProducao />
            ) : (
              <LabelProducao>Produção</LabelProducao>
            )}
          </LabelContainer>

          <LabelContainer>
            <DotEnviado filled={enviado}>
              <Icon
                size={40}
                name="motorcycle"
                color="#000"
                style={{ alignSelf: 'center', marginTop: 6 }}
              />
            </DotEnviado>
            {enviado === null ? (
              <LabelEnviado />
            ) : (
              <LabelEnviado>Enviado</LabelEnviado>
            )}
          </LabelContainer>

          <LabelContainer>
            <DotEntregue filled={entregue}>
              <Icon
                size={40}
                name="check"
                color="#000"
                style={{ alignSelf: 'center', marginTop: 6 }}
              />
            </DotEntregue>

            {entregue === null ? (
              <LabelEntregue />
            ) : (
              <LabelEntregue>Entregue</LabelEntregue>
            )}
          </LabelContainer>
          <LabelContainer>
            <DotCancelado filled={cancelado}>
              <Icon
                size={40}
                name="times"
                color="#000"
                style={{ alignSelf: 'center', marginTop: 6 }}
              />
            </DotCancelado>
            {cancelado === null ? (
              <LabelCancelado />
            ) : (
              <LabelCancelado>Cancelado</LabelCancelado>
            )}
          </LabelContainer>
        </StatusContainer>
        <ScrollView>
          <ListItem>
            <Icon
              size={40}
              name="phone"
              color="#00ff00"
              style={{ alignSelf: 'center', marginTop: 6 }}
            />

            <Text style={{ marginLeft: 10 }}>Ligar para o estabelecimento</Text>
          </ListItem>
          <ListItem>
            <Thumbnail
              source={{
                uri: order.estabelecimento.image.url.replace(
                  'localhost',
                  '10.0.0.104',
                ),
              }}
            />
            <Body>
              <Text style={{ marginLeft: 10 }}>
                {order.estabelecimento.name_loja}
              </Text>
            </Body>
          </ListItem>
          <Left>
            <Text>Pedido N° {order.id}</Text>
          </Left>
          <Text style={{ marginLeft: 5 }}>PRODUTOS</Text>
          {order.order_details.map(item => (
            <ListItem key={item.id}>
              <Text>{item.quantity}x</Text>
              <Thumbnail
                small
                source={{
                  uri: order.estabelecimento.image.url.replace(
                    'localhost',
                    '10.0.0.104',
                  ),
                }}
              />
              <Body>
                <Text style={{ marginLeft: 10 }}>{item.product.name}</Text>
              </Body>
              <Right>
                <Text>{formatPrice(item.product.price)}</Text>
              </Right>
            </ListItem>
          ))}
          <Text style={{ marginLeft: 5 }}>ENTREGA</Text>
          <ListItem>
            <Body>
              <Text note style={{ fontSize: 14 }}>
                {`${order.ship_neighborhood}, ${order.ship_city} - ${
                  order.ship_street_n
                }`}
              </Text>
              <Text note>{order.ship_complement}</Text>
              <Text note>{order.ship_reference}</Text>
            </Body>
          </ListItem>
          <Text style={{ marginLeft: 5 }}>TOTAIS E PAGAMENTOS</Text>
          <ListItem>
            <Body>
              <Text note>Produtos</Text>
              <Text note>Entrega</Text>
              <Text>Total</Text>
              <Text>Pagamento</Text>
            </Body>
            <Right>
              <Text note>{formatPrice(order.subtotal)}</Text>
              <Text note>{formatPrice(order.delivery_fee)}</Text>
              <Text>{formatPrice(order.total)}</Text>
              <Text>{order.payment_method}</Text>
            </Right>
          </ListItem>
          <Text note style={{ marginLeft: 10 }}>
            Pedido realizado em {orderDetails.dateFormatted}
          </Text>
        </ScrollView>
      </Container>
    </Background>
  );
}

OrderDetails.navigationOptions = ({ navigation }) => ({
  title: 'Detalhes do pedido',
});
