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
  const [status, setStatus] = useState([]);
  const porcentagemApp = (status.faturamentoTotal * 4) / 100;

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date],
  );

  useEffect(() => {
    async function loadStatus() {
      try {
        const response = await axios
          .all([
            api.get('/totalDinheiro', {
              params: { date },
            }),
            api.get('/totalCancelado', {
              params: { date },
            }),
            api.get('/totalCartao', {
              params: { date },
            }),
            api.get('/totalEntregue', {
              params: { date },
            }),
            api.get('/totalPedido', {
              params: { date },
            }),
            api.get('/totalPendente', {
              params: { date },
            }),
            api.get('/valorTotal', {
              params: { date },
            }),
            api.get('/faturamentoTotal'),
          ])
          .then(
            axios.spread(
              (
                totalDinheiro,
                totalCancelado,
                totalCartao,
                totalEntregue,
                totalPedido,
                totalPendente,
                valorTotal,
                faturamentoTotal,
              ) => ({
                totalDinheiro: totalDinheiro.data[0].subtotal,
                totalCancelado: totalCancelado.data[0].total,
                totalCartao: totalCartao.data[0].total,
                totalEntregue: totalEntregue.data[0].total,
                totalPedido: totalPedido.data[0].total,
                totalPendente: totalPendente.data[0].total,
                valorTotal: valorTotal.data[0].subtotal,
                valorTotalFrete: valorTotal.data[0].delivery_fee,
                faturamentoTotal: faturamentoTotal.data[0].subtotal,
              }),
            ),
          );

        setStatus(response);
      } catch (err) {
        toast.error('Falha ao conectar com o servidor');
      }
    }
    loadStatus();
  }, [date]);

  // relatorio dos pedidos por dia do estabelecimento
  useEffect(() => {
    async function loadPedidos() {
      try {
        const response = await api.get('relatoriopedidos', {
          params: { date },
        });
        setRelatorio(response.data);
      } catch (err) {
        toast.error('Falha ao conectar com o servidor');
      }
    }
    loadPedidos();
  }, [date]);

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">Minhas análises</div>
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
                          <strong>{status.totalPedido || loading}</strong>
                          <span>PEDIDOS</span>
                        </Time>
                        <Time>
                          <strong>{status.totalEntregue || loading}</strong>
                          <span>ENTREGUES</span>
                        </Time>
                        <Time>
                          <strong>{status.totalPendente || loading}</strong>
                          <span>PENDENTES</span>
                        </Time>
                        <Time>
                          <strong>{status.totalCancelado || loading}</strong>
                          <span>CANCELADOS</span>
                        </Time>
                      </ul>

                      <div>Faturamentos</div>

                      <ul>
                        <Time>
                          <strong>
                            {formatPrice(status.valorTotal) || loading}
                          </strong>
                          <span>VALOR TOTAL</span>
                        </Time>

                        <Time>
                          <strong>
                            {formatPrice(status.totalDinheiro) || loading}
                          </strong>
                          <span>DINHEIRO</span>
                        </Time>
                        <Time>
                          <strong>
                            {formatPrice(status.totalCartao) || loading}
                          </strong>
                          <span>CARTÃO</span>
                        </Time>

                        <Time>
                          <strong>
                            {formatPrice(status.valorTotalFrete) || loading}
                          </strong>
                          <span>VALOR DAS ENTREGAS</span>
                        </Time>
                      </ul>

                      <Content>
                        <ul>
                          <li>
                            <span>FATURAMENTO TOTAL ATE HOJE</span>
                            <strong>
                              {formatPrice(status.faturamentoTotal) || loading}
                            </strong>
                          </li>

                          <li>
                            <span>VALOR A SER PAGO NO MÊS</span>
                            <strong>
                              {formatPrice(porcentagemApp) || loading}
                            </strong>
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
                                    pathname: '/order',
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
                                <strong>
                                  ({produto.order_details.length})
                                </strong>
                                <img
                                  style={{
                                    height: 30,
                                    width: 30,
                                  }}
                                  src={
                                    produto.order_details[0].product.image.url
                                  }
                                  alt={produto.order_details[0].product.name}
                                />
                              </td>

                              <td>
                                <strong>
                                  {formatPrice(produto.order_details[0].price)}
                                </strong>
                              </td>

                              <td>
                                <strong>
                                  {formatPrice(produto.delivery_fee)}
                                </strong>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
