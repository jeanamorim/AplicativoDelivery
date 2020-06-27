/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialIcons';
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
  Label,
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
import colors from '../../../styles/colors';
export default function OrderDetails({ navigation, route }) {
  const [tableData, setTableData] = useState({});
  const [orderDetails, setOrderDetails] = useState({});
  const pendente = orderDetails.status === 'PENDENTE' ? 'PENDENTE' : null;
  const producao = orderDetails.status === 'PRODUCAO' ? 'PRODUCAO' : null;
  const enviado = orderDetails.status === 'ENVIADO' ? 'ENVIADO' : null;
  const entregue = orderDetails.status === 'ENTREGUE' ? 'ENTREGUE' : null;
  const cancelado = orderDetails.status === 'CANCELADO' ? 'CANCELADO' : null;
  const { order } = route.params;
  useEffect(() => {
    const orderDetailsFormatted = {
      ...order,
      dateFormatted: format(parseISO(order.date), 'PPPpp', {
        locale: dateLanguage,
      }),
    };

    setOrderDetails(orderDetailsFormatted);

    const tableHeader = ['Nome', 'Quantidade', 'Preço'];

    const tableRows = orderDetailsFormatted.order_details.map(order => [
      order.product.name,
      order.quantity,

      formatPrice(order.total),
    ]);

    setTableData({ tableHeader, tableRows });
  }, [navigation, order]);

  return (
    <Background>
      <Container>
        <StatusContainer>
          <LabelContainer>
            <DotPendente filled={pendente} />
            <Label>Pendente</Label>
          </LabelContainer>

          <LabelContainer>
            <DotProducao filled={producao} />
            <Label>Produzindo</Label>
          </LabelContainer>

          <LabelContainer>
            <DotEnviado filled={enviado} />
            <Label>Enviado</Label>
          </LabelContainer>

          <LabelContainer>
            <DotEntregue filled={entregue} />
            <Label>Entregue</Label>
          </LabelContainer>
          <LabelContainer>
            <DotCancelado filled={cancelado} />
            <Label>Rejeitado</Label>
          </LabelContainer>
        </StatusContainer>

        <ScrollView>
          <HeaderBackground />
          <DetailsCard orderDetails={orderDetails} />
          <Card style={{ elevation: 3 }}>
            <CardHeader>
              <Icons size={25} name="event" color="#F4A460" />
              <CardTitle>Situação da entrega e produtos</CardTitle>
            </CardHeader>
            <DateRow>
              <DateContainer>
                <Title>Status</Title>
                <Subtitle>{orderDetails.status}</Subtitle>
              </DateContainer>

              <DateContainer>
                <Title>Estabelecimento</Title>
                <Subtitle>ok</Subtitle>
              </DateContainer>
            </DateRow>

            <DateRow>
              <Table
                header={tableData.tableHeader}
                rows={tableData.tableRows}
              />
            </DateRow>
          </Card>

          <Card style={{ elevation: 3 }}>
            <CardHeader>
              <Icons size={25} name="event" color="#F4A460" />
              <CardTitle>Totais e pagamentos</CardTitle>
            </CardHeader>

            <DateRow>
              <DateContainer>
                <Subtitle>Produtos</Subtitle>
                <Subtitle>Entrega</Subtitle>
                <Subtitle>Total</Subtitle>
                <Subtitle>Pagamento</Subtitle>
              </DateContainer>

              <DateContainer>
                <Subtitle>{formatPrice(orderDetails.subtotal)}</Subtitle>
                <Subtitle>{formatPrice(orderDetails.delivery_fee)}</Subtitle>
                <Subtitle>{formatPrice(orderDetails.total)}</Subtitle>
                <Subtitle>{orderDetails.payment_method}</Subtitle>
              </DateContainer>
            </DateRow>
            <Title>Realizada em</Title>
            <Subtitle>{orderDetails.dateFormatted}</Subtitle>
          </Card>
        </ScrollView>
      </Container>
    </Background>
  );
}

OrderDetails.navigationOptions = ({ navigation }) => ({
  title: 'Detalhes do pedido',
});
