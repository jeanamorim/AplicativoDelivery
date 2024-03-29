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
import { Buttonn, Variacao, Opcao, ButtonAdicionar } from './styles';
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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.post('/products', data);

      document.getElementById('vd-form').reset();
      document.getElementById('image-container').src = sample_default;
      document.getElementById('image').removeAttribute('data-file');
      document.getElementById('image_id').value = null;

      setLoading(false);
      toast.success(translate('product_added_success'));
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
    async function loadCategories() {
      try {
        const response = await api.get('/categories');

        setCategories(response.data);
      } catch (err) {
        if (err.response) {
          toast.error(translate('server_error'));
        } else {
          toast.error(translate('server_connection_error'));
        }
      }
    }

    loadCategories();
  }, []);

  const loadingAnimation = (
    <Animation width={30} height={30} animation={loadingData} />
  );

  const options = categories.map(category => ({
    id: category.id,
    title: category.name,
  }));

  return (
    <div className="content-wrapper" style={{ marginTop: 40 }}>
      <div className="panel-body">
        <header>
          <Link to="/categoria">
            <Button
              style={{ backgroundColor: '#32cd32', color: '#fff' }}
              type="button"
              variant="contained"
              startIcon={<ArrowBackIcon />}
            >
              Voltar
            </Button>
          </Link>
        </header>
        {/* botao para adicionar as variações */}
        <ButtonAdicionar>
          <header>
            <Link to="/variacao">
              <button type="button" color="primary" variant="contained">
                Adicionar Variação
              </button>
            </Link>
            <Link to="/opcao">
              <button type="button" color="primary" variant="contained">
                Adicionar Opção
              </button>
            </Link>
          </header>
        </ButtonAdicionar>
        {/* modal para adicionar as variações */}

        {/* modal para adicionar as variações */}

        <Form
          id="vd-form"
          onSubmit={handleSubmit}
          schema={schema}
          className="form-horizontal"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <div className="col-sm-1">
              <ImageInput name="image_id" />
            </div>
            <label htmlFor="image_id" className="col-sm-2 control-label">
              Imagem
              <span style={{ color: 'red' }}>*</span>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="name" className="col-sm-4 control-label">
              Nome
              <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="col-sm-3">
              <Input type="text" name="name" className="form-control" />
            </div>
            <label htmlFor="category" className="col-sm-1 control-label">
              Categoria
              <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="col-sm-3">
              <Select
                name="category_id"
                className="form-control"
                options={options}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="col-sm-4 control-label">
              Descrição
              <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="col-sm-3">
              <Input className="form-control" name="description" multiline />
            </div>
            <label htmlFor="price" className="col-sm-1 control-label">
              Preço
              <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="col-sm-3">
              <Input type="text" name="price" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="quantity" className="col-sm-4 control-label">
              Quantidade
              <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="col-sm-3">
              <Input type="text" name="quantity" className="form-control" />
            </div>
            <label htmlFor="unit" className="col-sm-1 control-label">
              Unidade
              <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="col-sm-3">
              <Select
                name="unit"
                className="form-control"
                options={[
                  { id: 'kg', title: 'kg' },
                  { id: 'g', title: 'g' },
                  { id: 'dz', title: 'dz' },
                  { id: 'un', title: 'un' },
                ]}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <button
                name="submit"
                type="submit"
                style={{
                  backgroundColor: '#32cd32',
                  borderRadius: 4,
                  height: 40,
                  width: 150,
                  fontSize: 12,
                  color: '#fff',

                  marginLeft: 850,
                }}
              >
                {loading ? loadingAnimation : 'Salvar'}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
