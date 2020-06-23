/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { toast } from 'react-toastify';
import axios from 'axios';
import { formatPrice } from '../../util/format';
import api from '../../services/api';
import { Container, Time, Content, ProductTable, Header } from './styles';
import { dateLanguage } from '../../locales';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

export default function Analises() {
  const [date, setDate] = useState(new Date());
  const [relatorio, setRelatorio] = useState([]);
  const [totalpedido, setTotalpedidos] = useState([]);
  const [relatorioValorT, setRelatorioValorT] = useState([]);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );
  useEffect(() => {
    async function loadStatus() {
      try {
        const response = await api.get('relatoriopedidosdata', {
          params: { date },
        });

        setRelatorio(response.data);
      } catch (err) {
        toast.error('Falha ao conectar com o servidor');
      }
    }
    loadStatus();
  }, [date]);

  useEffect(() => {
    async function loadSValor() {
      try {
        const response = await api.get('relatoriovalortotal');

        setRelatorioValorT(response.data);
      } catch (err) {
        toast.error('Falha ao conectar com o servidor');
      }
    }
    loadSValor();
  }, []);

  useEffect(() => {
    async function loadValor() {
      try {
        const response = await api.get('totalpedido', {
          params: { date },
        });

        setTotalpedidos(response.data);
      } catch (err) {
        toast.error('Falha ao conectar com o servidor');
      }
    }
    loadValor();
  }, [date, totalpedido]);

  function handleDay(add) {
    setDate(add ? addDays(date, 1) : subDays(date, 1));
  }

  const loading = <Animation width={40} height={40} animation={loadingData} />;

  const className = status => {
    switch (status) {
      case 'ENTREGUE':
        return 'text-success';
      case 'ENVIADO':
        return 'text-success';
      case 'PENDENTE':
        return 'text-info';
      case 'PRODUCAO':
        return 'text-info';
      case 'CANCELADO':
        return 'text-danger';
      default:
        return '';
    }
  };

  const statusName = status => {
    switch (status) {
      case 'ENVIADO':
        return 'Enviado';
      case 'PRODUCAO':
        return 'Produção';
      case 'CANCELADO':
        return 'Cancelado';
      case 'PENDENTE':
        return 'Pendente';
      case 'ENTREGUE':
        return 'Entregue';
      default:
        return '';
    }
  };
  return (
    <div className="content-wrapper" style={{ marginTop: 40 }}>
      <div className="panel-body">
        <Header>
          <header>
            <button type="button" onClick={() => handleDay(false)}>
              <MdChevronLeft size={43} color="#FF4500" />
            </button>
            <strong>{dateFormatted}</strong>
            <button type="button" onClick={() => handleDay(true)}>
              <MdChevronRight size={43} color="#FF4500" />
            </button>
          </header>
        </Header>
        <Container>
          <div>Quantidades</div>

          <ul>
            <Time>
              <strong>{relatorio ? relatorio.length : loading}</strong>
              <span>PEDIDOS</span>
            </Time>
            <Time>
              <strong>20</strong>
              <span>ENTREGUES</span>
            </Time>
            <Time>
              <strong>{relatorio ? relatorio.length : loading}</strong>
              <span>PENDENTES</span>
            </Time>
            <Time>
              <strong>{relatorio ? relatorio.length : loading}</strong>
              <span>CANCELADOS</span>
            </Time>
          </ul>

          <div>Faturamentos</div>
          <ul>
            <Time>
              <strong>10</strong>
              <span>VALOR TOTAL</span>
            </Time>

            <Time>
              <strong>R$526,00</strong>
              <span>DINHEIRO</span>
            </Time>
            <Time>
              <strong>10</strong>
              <span>CARTÃO</span>
            </Time>

            <Time>
              <strong>10</strong>
              <span>VALOR DAS ENTREGAS</span>
            </Time>
          </ul>

          <Content>
            <ul>
              <li>
                <span>FATURAMENTO TOTAL ATE HOJE</span>
                <strong>{formatPrice(546)}</strong>
              </li>

              <li>
                <span>PORCENTAGEM A SER PAGA AO APP</span>
                <strong>{formatPrice(546)}</strong>
              </li>
            </ul>
          </Content>
          <div>Lista de Pedidos do Dia</div>
          <ProductTable>
            <thead>
              <tr>
                <th>Data</th>
                <th>Produto</th>

                <th>Preço</th>
                <th>Entrega</th>
                <th>Subtotal</th>

                <th>Forma Pagt.</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {relatorio.map(produto => (
                <tr>
                  <td>
                    <Link
                      to={{
                        pathname: '/pedido',
                        search: `?id=${produto.id}`,
                        state: {
                          orderData: produto,
                        },
                      }}
                    >
                      <span>
                        {format(parseISO(produto.date), 'Pp', {
                          locale: dateLanguage,
                        })}
                      </span>
                    </Link>
                  </td>

                  <td>
                    <strong>({produto.order_details.length})</strong>
                    <img
                      style={{
                        height: 30,
                        width: 30,
                      }}
                      src={produto.order_details[0].product.image.url}
                      alt={produto.order_details[0].product.name}
                    />
                  </td>

                  <td>
                    <strong>
                      {formatPrice(produto.order_details[0].price)}
                    </strong>
                  </td>

                  <td>
                    <strong>{formatPrice(produto.delivery_fee)}</strong>
                  </td>
                  <td>
                    <strong>{formatPrice(produto.total)}</strong>
                  </td>
                  <td>
                    <strong>{produto.payment_method}</strong>
                  </td>
                  <td>
                    <strong className={className(produto.status)}>
                      {statusName(produto.status)}
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductTable>
        </Container>
      </div>
    </div>
  );
}
