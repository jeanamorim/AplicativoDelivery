/* eslint-disable import/order */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { parseISO, formatDistanceStrict } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { formatPrice } from '../../util/format';

import './styles.css';
import api from '../../services/api';

export default function Pedidos() {
  const [pendente_, setPendente_] = useState([]);
  const [producao_, setProducao_] = useState([]);
  const [enviado_, setEnviado_] = useState([]);
  const [entregue_, setEntregue_] = useState([]);
  const [cancelado_, setCancelado_] = useState([]);
  const [date] = useState(new Date());
  const [render, setRender] = useState(false);
  const [, setValue] = useState({});
  async function handleChange(event) {
    const status = event.target.value;
    const orderId = event.target.id;
    setValue({
      id: Number(orderId),
      status,
    });

    try {
      await api.put(`/orders/${orderId}`, {
        status,
      });

      if (status === 'CANCELADO') {
        await api.delete(`/orders/${orderId}`);
        toast.success('Pedido cancelado');
      }

      setRender(!render);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Erro ao conectar com o servidor');
      }
    }
  }
  useEffect(() => {
    async function loadStatusPend() {
      try {
        const response = await api.get(`status/PENDENTE`, {
          params: { date },
        });
        console.tron.log(response.data);
        const data = response.data.map(statusPendenetes => ({
          ...statusPendenetes,
          timeDistance: formatDistanceStrict(
            parseISO(statusPendenetes.date),
            new Date(),
            { addSuffix: true, locale: pt },
          ),
        }));

        setPendente_(data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadStatusPend();
  }, [date, render]);
  useEffect(() => {
    async function loadStatusProd() {
      try {
        const response = await api.get(`status/PRODUCAO`, {
          params: { date },
        });

        const data = response.data.map(statusAprovado => ({
          ...statusAprovado,
          timeDistance: formatDistanceStrict(
            parseISO(statusAprovado.date),
            new Date(),
            { addSuffix: true, locale: pt },
          ),
        }));

        setProducao_(data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadStatusProd();
  }, [date, render]);
  useEffect(() => {
    async function loadStatusEnv() {
      try {
        const response = await api.get(`status/ENVIADO`, {
          params: { date },
        });

        const data = response.data.map(statusEnviado => ({
          ...statusEnviado,
          timeDistance: formatDistanceStrict(
            parseISO(statusEnviado.date),
            new Date(),
            { addSuffix: true, locale: pt },
          ),
        }));

        setEnviado_(data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadStatusEnv();
  }, [date, render]);
  useEffect(() => {
    async function loadStatusCanc() {
      try {
        const response = await api.get(`status/CANCELADO`, {
          params: { date },
        });

        const data = response.data.map(statusCancelado => ({
          ...statusCancelado,
          timeDistance: formatDistanceStrict(
            parseISO(statusCancelado.date),
            new Date(),
            { addSuffix: true, locale: pt },
          ),
        }));

        setCancelado_(data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadStatusCanc();
  }, [date, render]);
  useEffect(() => {
    async function loadStatusEntre() {
      try {
        const response = await api.get(`status/ENTREGUE`, {
          params: { date },
        });

        const data = response.data.map(statusEntregue => ({
          ...statusEntregue,
          timeDistance: formatDistanceStrict(
            parseISO(statusEntregue.date),
            new Date(),
            { addSuffix: true, locale: pt },
          ),
        }));

        setEntregue_(data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadStatusEntre();
  }, [date, render]);

  // const loading = <Animation width={30} height={30} animation={loadingData} />;
  function refreshPage() {
    window.location.reload();
  }
  return (
    <body>
      <div className="content-wrapper" style={{ marginTop: 20 }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <div style={{ display: 'flex' }}>
                    <Link to="/lista">
                      <button
                        style={{
                          background: '#32cd32',
                          width: 150,
                          color: '#fff',
                          margin: 1,
                          borderRadius: 5,
                          borderColor: '#fff',
                        }}
                      >
                        Listar Pedidos
                      </button>
                    </Link>

                    <button
                      style={{
                        background: '#32cd32',
                        width: 150,
                        color: '#fff',
                        margin: 1,
                        borderRadius: 5,
                        borderColor: '#fff',
                      }}
                      onClick={refreshPage}
                    >
                      Atualizar
                    </button>
                    <button
                      style={{
                        background: '#32cd32',
                        width: 150,
                        color: '#fff',
                        margin: 1,
                        borderRadius: 5,
                        borderColor: '#fff',
                      }}
                    >
                      Testar som
                    </button>
                  </div>
                </div>

                <div className="menuPedidosstatus">
                  <div
                    className="panel-heading"
                    style={{ background: '#fff' }}
                  />
                  <div className="panel-body">
                    <button disabled type="button" className="button_status">
                      Pendentes
                    </button>

                    <div className="board" id="boardjsplain">
                      <div className="list">
                        <>
                          {pendente_.map(order => (
                            <div className="cards">
                              <div
                                className="panel panel-default"
                                style={{ borderColor: '#F4A460' }}
                              >
                                <Link
                                  to={{
                                    pathname: '/order',
                                    search: `?id=${order.id}`,
                                    state: {
                                      orderData: order,
                                    },
                                  }}
                                  className="block-anchor panel-footer text-center"
                                  style={{
                                    background: '#F4A460',
                                    color: '#fff',
                                  }}
                                >
                                  {order.timeDistance}
                                </Link>
                                <div className="panel-body bk-secondary text-dark">
                                  <div className="stat-panel">
                                    <div className="bairro">
                                      {order.ship_neighborhood}
                                    </div>
                                    <div
                                      className="text-right"
                                      style={{ marginTop: -20 }}
                                    >
                                      <div>#{order.id}</div>
                                      <div>{formatPrice(order.total)}</div>
                                      <div>{order.payment_method}</div>
                                    </div>

                                    <div
                                      className="stat-panel-title"
                                      style={{ marginTop: -20 }}
                                    >
                                      {order.order_details.map(image => (
                                        <img
                                          className="image"
                                          src={image.product.image.url}
                                          alt={image.product.name}
                                        />
                                      ))}
                                    </div>
                                    <div className="stat-panel-title">
                                      {order.order_details.map(qtd => (
                                        <div className="qtd">
                                          {' '}
                                          {qtd.quantity}x{' '}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  style={{ display: 'flex', marginTop: -20 }}
                                >
                                  <button
                                    style={{
                                      width: '50%',
                                      background: '#F43C04',
                                      color: '#fff',
                                      borderColor: '#fff',
                                    }}
                                    id={order.id}
                                    onClick={handleChange}
                                    type="button"
                                    value="CANCELADO"
                                  >
                                    Rejeitar
                                  </button>
                                  <button
                                    style={{
                                      width: '50%',
                                      background: '#048923',
                                      color: '#fff',
                                      borderColor: '#fff',
                                    }}
                                    id={order.id}
                                    onClick={handleChange}
                                    type="button"
                                    value="PRODUCAO"
                                  >
                                    Aprovar
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body">
                    <button disabled type="button" className="button_status">
                      Produzindo
                    </button>

                    <div className="board" id="boardjsplain">
                      <div className="list">
                        <>
                          {producao_.map(order => (
                            <div className="cards">
                              <div
                                className="panel panel-default"
                                style={{ borderColor: '#F4A460' }}
                              >
                                <Link
                                  to={{
                                    pathname: '/order',
                                    search: `?id=${order.id}`,
                                    state: {
                                      orderData: order,
                                    },
                                  }}
                                  className="block-anchor panel-footer text-center"
                                  style={{
                                    background: '#F4A460',
                                    color: '#fff',
                                  }}
                                >
                                  {order.timeDistance}
                                </Link>
                                <div className="panel-body bk-secondary text-dark">
                                  <div className="stat-panel">
                                    <div className="bairro">
                                      {order.ship_neighborhood}
                                    </div>
                                    <div
                                      className="text-right"
                                      style={{ marginTop: -20 }}
                                    >
                                      <div>#{order.id}</div>
                                      <div>{formatPrice(order.total)}</div>
                                      <div>{order.payment_method}</div>
                                    </div>

                                    <div
                                      className="stat-panel-title"
                                      style={{ marginTop: -20 }}
                                    >
                                      {order.order_details.map(image => (
                                        <img
                                          className="image"
                                          src={image.product.image.url}
                                          alt={image.product.name}
                                        />
                                      ))}
                                    </div>
                                    <div className="stat-panel-title">
                                      {order.order_details.map(qtd => (
                                        <div className="qtd">
                                          {' '}
                                          {qtd.quantity}x{' '}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  style={{ display: 'flex', marginTop: -20 }}
                                >
                                  <button
                                    style={{
                                      width: '50%',
                                      background: '#999',
                                      color: '#fff',
                                      borderColor: '#fff',
                                    }}
                                  >
                                    Imprimir
                                  </button>
                                  <button
                                    style={{
                                      width: '50%',
                                      background: '#048923',
                                      color: '#fff',
                                      borderColor: '#fff',
                                    }}
                                    id={order.id}
                                    onClick={handleChange}
                                    type="button"
                                    value="ENVIADO"
                                  >
                                    Enviar
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body">
                    <button disabled type="button" className="button_status">
                      Enviados
                    </button>

                    <div className="board" id="boardjsplain">
                      <div className="list">
                        <>
                          {enviado_.map(order => (
                            <div className="cards">
                              <div
                                className="panel panel-default"
                                style={{ borderColor: '#F4A460' }}
                              >
                                <Link
                                  to={{
                                    pathname: '/order',
                                    search: `?id=${order.id}`,
                                    state: {
                                      orderData: order,
                                    },
                                  }}
                                  className="block-anchor panel-footer text-center"
                                  style={{
                                    background: '#F4A460',
                                    color: '#fff',
                                  }}
                                >
                                  {order.timeDistance}
                                </Link>
                                <div className="panel-body bk-secondary text-dark">
                                  <div className="stat-panel">
                                    <div className="bairro">
                                      {order.ship_neighborhood}
                                    </div>
                                    <div
                                      className="text-right"
                                      style={{ marginTop: -20 }}
                                    >
                                      <div>#{order.id}</div>
                                      <div>{formatPrice(order.total)}</div>
                                      <div>{order.payment_method}</div>
                                    </div>

                                    <div
                                      className="stat-panel-title"
                                      style={{ marginTop: -20 }}
                                    >
                                      {order.order_details.map(image => (
                                        <img
                                          className="image"
                                          src={image.product.image.url}
                                          alt={image.product.name}
                                        />
                                      ))}
                                    </div>
                                    <div className="stat-panel-title">
                                      {order.order_details.map(qtd => (
                                        <div className="qtd">
                                          {' '}
                                          {qtd.quantity}x{' '}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  style={{ display: 'flex', marginTop: -20 }}
                                >
                                  <button
                                    style={{
                                      width: '50%',
                                      background: '#999',
                                      color: '#fff',
                                      borderColor: '#fff',
                                    }}
                                  >
                                    imprimir
                                  </button>
                                  <button
                                    style={{
                                      width: '50%',
                                      background: '#048923',
                                      color: '#fff',
                                      borderColor: '#fff',
                                    }}
                                    id={order.id}
                                    onClick={handleChange}
                                    type="button"
                                    value="ENTREGUE"
                                  >
                                    Entregar
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body">
                    <button disabled type="button" className="button_status">
                      Entregues
                    </button>

                    <div className="board" id="boardjsplain">
                      <div className="list">
                        <>
                          {entregue_.map(order => (
                            <div className="cards">
                              <div
                                className="panel panel-default"
                                style={{ borderColor: '#F4A460' }}
                              >
                                <Link
                                  to={{
                                    pathname: '/order',
                                    search: `?id=${order.id}`,
                                    state: {
                                      orderData: order,
                                    },
                                  }}
                                  className="block-anchor panel-footer text-center"
                                  style={{
                                    background: '#F4A460',
                                    color: '#fff',
                                  }}
                                >
                                  {order.timeDistance}
                                </Link>
                                <div className="panel-body bk-secondary text-dark">
                                  <div className="stat-panel">
                                    <div className="bairro">
                                      {order.ship_neighborhood}
                                    </div>
                                    <div
                                      className="text-right"
                                      style={{ marginTop: -20 }}
                                    >
                                      <div>#{order.id}</div>
                                      <div>{formatPrice(order.total)}</div>
                                      <div>{order.payment_method}</div>
                                    </div>

                                    <div
                                      className="stat-panel-title"
                                      style={{ marginTop: -20 }}
                                    >
                                      {order.order_details.map(image => (
                                        <img
                                          className="image"
                                          src={image.product.image.url}
                                          alt={image.product.name}
                                        />
                                      ))}
                                    </div>
                                    <div className="stat-panel-title">
                                      {order.order_details.map(qtd => (
                                        <div className="qtd">
                                          {' '}
                                          {qtd.quantity}x{' '}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  style={{ display: 'flex', marginTop: -20 }}
                                >
                                  <button
                                    style={{
                                      width: '100%',
                                      background: '#999',
                                      color: '#fff',
                                      borderColor: '#fff',
                                    }}
                                  >
                                    Imprimir
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body">
                    <button disabled type="button" className="button_status">
                      Cancelados
                    </button>

                    <div className="board" id="boardjsplain">
                      <div className="list">
                        <>
                          {cancelado_.map(order => (
                            <div className="cards">
                              <div
                                className="panel panel-default"
                                style={{ borderColor: '#F4A460' }}
                              >
                                <Link
                                  to={{
                                    pathname: '/order',
                                    search: `?id=${order.id}`,
                                    state: {
                                      orderData: order,
                                    },
                                  }}
                                  className="block-anchor panel-footer text-center"
                                  style={{
                                    background: '#F4A460',
                                    color: '#fff',
                                  }}
                                >
                                  {order.timeDistance}
                                </Link>
                                <div className="panel-body bk-secondary text-dark">
                                  <div className="stat-panel">
                                    <div className="bairro">
                                      {order.ship_neighborhood}
                                    </div>
                                    <div
                                      className="text-right"
                                      style={{ marginTop: -20 }}
                                    >
                                      <div>#{order.id}</div>
                                      <div>{formatPrice(order.total)}</div>
                                      <div>{order.payment_method}</div>
                                    </div>

                                    <div
                                      className="stat-panel-title"
                                      style={{ marginTop: -20 }}
                                    >
                                      {order.order_details.map(image => (
                                        <img
                                          className="image"
                                          src={image.product.image.url}
                                          alt={image.product.name}
                                        />
                                      ))}
                                    </div>
                                    <div className="stat-panel-title">
                                      {order.order_details.map(qtd => (
                                        <div className="qtd">
                                          {' '}
                                          {qtd.quantity}x{' '}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  style={{ display: 'flex', marginTop: -20 }}
                                >
                                  <button
                                    disabled
                                    style={{
                                      width: '100%',
                                      background: '#999',
                                      color: '#fff',
                                      borderColor: '#fff',
                                    }}
                                  >
                                    Cancelado
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
