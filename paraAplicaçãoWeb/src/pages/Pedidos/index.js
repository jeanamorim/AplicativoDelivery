/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { parseISO, formatDistanceStrict } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { green, pink } from '@material-ui/core/colors';

import {
  MdMotorcycle,
  MdReceipt,
  MdHotTub,
  MdPhonelinkErase,
  MdDone,
  MdRefresh,
  MdVolumeUp,
} from 'react-icons/md';

import { formatPrice } from '../../util/format';

import './styles.css';
import api from '../../services/api';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
  red: {
    color: '#FF4500',
    backgroundColor: '#FF4500',
  },
  blue: {
    color: '#3A5FCD',
    backgroundColor: '#3A5FCD',
  },
  vermelho: {
    color: '#FF4040',
    backgroundColor: '#FF4040',
  },
}));

export default function Pedidos() {
  const classes = useStyles();
  const [entregue, setEntregue] = useState(true);
  const [cancelado, setCancelado] = useState(true);

  const [pendente_, setPendente_] = useState([]);
  const [producao_, setProducao_] = useState([]);
  const [enviado_, setEnviado_] = useState([]);
  const [entregue_, setEntregue_] = useState([]);
  const [cancelado_, setCancelado_] = useState([]);
  const [date] = useState(new Date());
  const [render, setRender] = useState(false);
  const [, setValue] = useState({});

  const _cancelado = () => {
    cancelado ? setCancelado(false) : setCancelado(true);
  };
  const _entregue = () => {
    entregue ? setEntregue(false) : setEntregue(true);
  };

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
            { addSuffix: true, locale: pt }
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
            { addSuffix: true, locale: pt }
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
            { addSuffix: true, locale: pt }
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
            { addSuffix: true, locale: pt }
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
            { addSuffix: true, locale: pt }
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

  function refreshPage() {
    window.location.reload();
  }
  // const loading = <Animation width={30} height={30} animation={loadingData} />;

  return (
    <body>
      <div className="content-wrapper" style={{ marginTop: 80 }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="menuPedidosstatus">
                  <div className="panel-body">
                    <div className="board" id="boardjsplain">
                      <div className="list">
                        <>
                          {pendente_.map(order => (
                            <div
                              className="col-md-13"
                              style={{ width: '100%' }}
                            >
                              <div
                                className="panel panel-default"
                                style={{ borderColor: '#F4A460' }}
                              >
                                <Link
                                  to="/orders"
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
                                    <div>{order.ship_neighborhood}</div>
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
                    <button type="button" className="menupedidos">
                      <div className="titulopedido"> Pedidos em produção </div>
                      <div className="iconpedidos">
                        <Avatar className={classes.red}>
                          <MdHotTub color="#fff" />
                        </Avatar>
                      </div>
                    </button>
                    <div className="board" id="boardjsplain">
                      <div className="list">
                        <>
                          {producao_.map(order => (
                            <div
                              className="col-md-13"
                              style={{ width: '100%' }}
                            >
                              <div
                                className="panel panel-default"
                                style={{ borderColor: '#F4A460' }}
                              >
                                <Link
                                  to="/orders"
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
                                    <div>{order.ship_neighborhood}</div>
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
                                      background: '#9999',
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
                    <button type="button" className="menupedidos">
                      <div className="titulopedido"> Pedidos Enviados </div>
                      <div className="iconpedidos">
                        <Avatar className={classes.blue}>
                          <MdMotorcycle color="#fff" />
                        </Avatar>
                      </div>
                    </button>
                    <div className="board" id="boardjsplain">
                      <div className="list">
                        <>
                          {enviado_.map(order => (
                            <div
                              className="col-md-13"
                              style={{ width: '100%' }}
                            >
                              <div
                                className="panel panel-default"
                                style={{ borderColor: '#F4A460' }}
                              >
                                <Link
                                  to="/orders"
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
                                    <div>{order.ship_neighborhood}</div>
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
                    <button
                      type="button"
                      className="menupedidos"
                      onClick={_entregue}
                    >
                      <div className="titulopedido"> Pedidos Entregues </div>
                      <div className="iconpedidos">
                        <Avatar className={classes.green}>
                          <MdDone color="#fff" />
                        </Avatar>
                      </div>
                    </button>
                    {entregue ? (
                      <div className="board" id="boardjsplain">
                        <div className="list">
                          <>
                            {entregue_.map(order => (
                              <div
                                className="col-md-13"
                                style={{ width: '100%' }}
                              >
                                <div
                                  className="panel panel-default"
                                  style={{ borderColor: '#F4A460' }}
                                >
                                  <Link
                                    to="/orders"
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
                                      <div>{order.ship_neighborhood}</div>
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
                    ) : (
                      <div />
                    )}
                  </div>
                  <div className="panel-body">
                    <button
                      type="button"
                      className="menupedidos"
                      onClick={_cancelado}
                    >
                      <div className="titulopedido"> Pedidos Cancelados </div>
                      <div className="iconpedidos">
                        <Avatar className={classes.vermelho}>
                          <MdPhonelinkErase color="#fff" />
                        </Avatar>
                      </div>
                    </button>
                    {cancelado ? (
                      <div className="board" id="boardjsplain">
                        <div className="list">
                          <>
                            {cancelado_.map(order => (
                              <div
                                className="col-md-13"
                                style={{ width: '100%' }}
                              >
                                <div
                                  className="panel panel-default"
                                  style={{ borderColor: '#F4A460' }}
                                >
                                  <Link
                                    to="/orders"
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
                                      <div>{order.ship_neighborhood}</div>
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
                    ) : (
                      <div />
                    )}
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
