/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
import ImageInput from '../../components/ImageInput';
import { Buttonn, Variacao } from './styles';
import api from '../../services/api';

import sample_default from '../../assets/cam.jpg';
import translate from '../../locales';

const schema = Yup.object().shape({
  image_id: Yup.number().required(translate('product_image_error')),
  name: Yup.string().required(translate('product_title_error')),
  category_id: Yup.string().required(translate('product_category_error')),
  description: Yup.string().required(translate('product_description_error')),
  quantity: Yup.string()
    .matches(/^[+]?([.]\d+|\d+[.]?\d*)$/, translate('product_quantity_error_1'))
    .required(translate('product_quantity_error_2')),
  unit: Yup.string().required(translate('product_unit_error')),
  price: Yup.string()
    .matches(/^[+]?([.]\d+|\d+[.]?\d*)$/, translate('product_price_error_1'))
    .required(translate('product_price_error_2')),
});

export default function AddProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get('/productsList');

        setProducts(response.data);
      } catch (err) {
        if (err.response) {
          toast.error(translate('server_error'));
        } else {
          toast.error(translate('server_connection_error'));
        }
      }
    }

    loadProducts();
  }, []);
  const options = products.map(product => ({
    id: product.id,
    title: product.name,
  }));

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.post('/variacao', data);

      document.getElementById('vd-form').reset();

      setLoading(false);
      toast.success('Variação cadastrada com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error('Falaha no servidor');
        setLoading(false);
      } else {
        toast.error('Erro ao conectar com o servidor');
        setLoading(false);
      }
    }
  }

  return (
    <div className="content-wrapper" style={{ marginTop: 80 }}>
      <div className="panel-body">
        <Buttonn>
          <header>
            <Link to="/novo-produto">
              <Button
                type="button"
                color="primary"
                variant="contained"
                startIcon={<ArrowBackIcon />}
              >
                Voltar
              </Button>
            </Link>
          </header>
        </Buttonn>
        {/* botao para adicionar as variações */}

        {/* modal para adicionar as variações */}

        {/* modal para adicionar as variações */}

        <Form onSubmit={handleSubmit} id="vd-form">
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="name">Selecione o produto</label>
              <Select
                name="product_id"
                className="form-control"
                options={options}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="name">Nome</label>
              <Input
                type="text"
                className="form-control"
                name="name"
                placeholder="Nome da variação"
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="minimo">Mínimo</label>
              <Input
                type="text"
                className="form-control"
                id="minimo"
                name="minimo"
                placeholder="Qtd Minima"
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="maximo">Máximo</label>
              <Input
                type="text"
                className="form-control"
                id="maximo"
                name="maximo"
                placeholder="Qtd Máxima"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-4 col-sm-offset-9">
              <Buttonn>
                <header>
                  <Button
                    name="submit"
                    type="submit"
                    color="primary"
                    variant="contained"
                  >
                    Cadastrar
                  </Button>
                </header>
              </Buttonn>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
