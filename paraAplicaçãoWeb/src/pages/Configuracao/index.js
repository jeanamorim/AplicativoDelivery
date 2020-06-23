/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
// import { Container } from './styles';
import { MdMotorcycle, MdQueryBuilder, MdCreditCard } from 'react-icons/md';

import translate from '../../locales';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import api from '../../services/api';

const schema = Yup.object().shape({
  deliveryFee: Yup.string().required(translate('setting_delivery_fee_error')),
  minimumOrderValue: Yup.string().required(
    translate('setting_minimun_order_value_error')
  ),
});

export default function Configuracao() {
  const [loading, setLoading] = useState(false);
  const [haveSavedSettings, setHaveSavedSettings] = useState(true);
  const [haveSavedFrete, setHaveSavedFrete] = useState(true);
  const [settings, setSettings] = useState({});
  const [frete, setFrete] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState(0);
  const [value, setValue] = useState({});

  async function handleChange(event) {
    const status = event.target.value;
    const orderId = event.target.id;
    setValue({
      id: Number(orderId),
      status,
    });

    if (status !== '') {
      setUpdatingStatus(orderId);
      try {
        await api.put(`/frete/${orderId}`, {
          status,
        });
      } catch (err) {
        if (err.response) {
          toast.error(translate('server_error'));
        } else {
          toast.error(translate('server_connection_error'));
        }
      }
    }
  }

  async function handleSubmit(data) {
    setLoading(true);
    try {
      if (haveSavedSettings) {
        await api.put('settings', {
          delivery_fee: `[${data.deliveryFee},${data.minimumOrderValue}]`,
        });
      } else {
        await api.post('settings', {
          delivery_fee: `[${data.deliveryFee},${data.minimumOrderValue}]`,
        });
      }
      toast.success(translate('settings_updated_success'));
      setLoading(false);
    } catch (err) {
      if (err.response) {
        toast.error(translate('server_error'));
        setLoading(false);
      } else {
        toast.error(translate('server_connection_error'));
        setLoading(false);
      }
    }
  }
  async function handleSubmitFrete(data) {
    setLoading(true);
    try {
      if (haveSavedFrete) {
        await api.put('frete', {
          price: `[${data.price}]`,
        });
      } else {
        await api.post('frete', {
          price: `[${data.price}]`,
        });
      }
      toast.success(translate('settings_updated_success'));
      setLoading(false);
    } catch (err) {
      if (err.response) {
        toast.error(translate('server_error'));
        setLoading(false);
      } else {
        toast.error(translate('server_connection_error'));
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    async function loadSettings() {
      const response = await api.get('settings');

      const defaultValues = {
        deliveryFee: 0,
        minimumOrderValue: 0,
      };

      if (response.data.length) {
        const data = response.data[0];
        const deliveryFee = data.delivery_fee
          ? JSON.parse(data.delivery_fee)
          : [0, 0];

        setSettings({
          deliveryFee: deliveryFee[0],
          minimumOrderValue: deliveryFee[1],
        });
      } else {
        setHaveSavedSettings(false);
        setSettings(defaultValues);
      }
    }

    loadSettings();
  }, []);

  useEffect(() => {
    async function loadFrete() {
      try {
        const response = await api.get('/frete');

        setFrete(response.data);
        if (updatingStatus !== 0) {
          setUpdatingStatus(0);
          toast.success('Status atualizado com sucesso');
        }
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadFrete();
  }, [updatingStatus]);

  const className = status => {
    switch (status) {
      case 'ATIVO':
        return 'text-success';
      case 'INATIVO':
        return 'text-danger';
      default:
        return '';
    }
  };

  const statusName = status => {
    switch (status) {
      case 'ATIVO':
        return 'Entrega Ativa';
      case 'INATIVO':
        return 'Entrega Inativa';
      default:
        return '';
    }
  };

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="page-title">Configuraçoes</h2>

            <div className="panel panel-default">
              <div className="panel-heading">
                <Link to="/lista">
                  <button className="buttonheader" variant="contained">
                    <div className="titulopedidoHeader">Valores e Entregas</div>
                    <div className="iconsButtonHeader">
                      <MdMotorcycle />
                    </div>
                  </button>
                </Link>

                <button
                  className="buttonheader"
                  variant="contained"
                  type="button"
                >
                  <div className="titulopedidoHeader">Forma de Pagamentos</div>
                  <div className="iconsButtonHeader">
                    <MdCreditCard />
                  </div>
                </button>

                <Link to="/categoria">
                  <button className="buttonheader" variant="contained">
                    <div className="titulopedidoHeader">
                      {' '}
                      Hor. Funcionamento
                    </div>
                    <div className="iconsButtonHeader">
                      <MdQueryBuilder />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-md-6 col-md-offset-3">
              <Form
                initialData={settings}
                onSubmit={handleSubmit}
                id="vd-form"
                schema={schema}
              >
                <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-6">
                    <div className="form-group">
                      <label htmlFor="deliveryFee">
                        Taxa de entrega de (R$)
                      </label>
                      <Input
                        disabled
                        type="text"
                        name="deliveryFee"
                        id="deliveryFee"
                        className="form-control Input-md"
                        placeholder="Digite um valor "
                      />
                    </div>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-6">
                    <div className="form-group">
                      <label htmlFor="deliveryFee">
                        Para compras acima de (R$)
                      </label>
                      <Input
                        type="text"
                        name="minimumOrderValue"
                        id="minimumOrderValue"
                        className="form-control Input-md"
                        placeholder="Digite um valor"
                      />
                    </div>
                  </div>
                </div>

                <button className="btn btn-warning btn-block" type="submit">
                  {loading ? (
                    <Animation width={30} height={30} animation={loadingData} />
                  ) : (
                    'Salvar'
                  )}
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h2 className="page-title">Frete por Bairro (R$)</h2>
              <div className="panel panel-default">
                <div className="panel-heading">Lista de Bairros</div>
                <div className="panel-body">
                  <Form onSubmit={handleSubmitFrete}>
                    {frete.map(freteon => (
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label htmlFor="price">{freteon.name}</label>
                          <input
                            type="text"
                            className="form-control"
                            name="price"
                            id="price"
                            placeholder="Digite o valor do frete"
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label htmlFor="inputEstado">Status</label>
                          <select
                            id={freteon.id}
                            value={value.id === freteon.id ? value.status : ''}
                            onChange={handleChange}
                            className="form-control"
                          >
                            <option />
                            <option value="ATIVO">Entrega Ativa</option>
                            <option value="INATIVO">Entrega Inativa</option>
                          </select>
                        </div>
                        <div className="form-group col-md-3">
                          <label htmlFor="inputCEP">Situação</label>
                          <label disabled type="text" className="form-control">
                            <b className={className(freteon.status)}>
                              {statusName(freteon.status)}
                            </b>
                          </label>
                        </div>
                      </div>
                    ))}
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <button
                          className="btn btn-warning btn-block"
                          type="submit"
                        >
                          {loading ? (
                            <Animation
                              width={30}
                              height={30}
                              animation={loadingData}
                            />
                          ) : (
                            'Salvar'
                          )}
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
