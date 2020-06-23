/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
import sample_default from '../../assets/img/sample_default.jpg';
import ImageInput from '../../components/ImageInput';
import { Buttonn } from './styles';
import api from '../../services/api';
import translate from '../../locales';

const schema = Yup.object().shape({
  name: Yup.string().required(translate('category_title_error')),
  image_id: Yup.number().required(translate('category_image_error')),
});

const loadingAnimation = (
  <Animation width={30} height={30} animation={loadingData} />
);

export default function AddCategory() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.post('/categories', data);

      document.getElementById('vd-form').reset();
      document.getElementById('image-container').src = sample_default;
      document.getElementById('image').removeAttribute('data-file');
      document.getElementById('image_id').value = null;

      setLoading(false);
      toast.success(translate('category_added_success'));
    } catch (err) {
      if (err.response) {
        toast.error(translate('server_error'));
      } else {
        toast.error(translate('server_connection_error'));
      }
    }
  }

  return (
    <div className="content-wrapper" style={{ marginTop: 80 }}>
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
        <Form
          id="vd-form"
          schema={schema}
          className="form-horizontal"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label
              htmlFor="image_id"
              className="col-sm-2 control-label"
              style={{ marginLeft: 230 }}
            >
              Imagem
              <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="col-sm-4" style={{ marginLeft: -95 }}>
              <ImageInput name="image_id" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name" className="col-sm-6 control-label">
              Categoria
              <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="col-sm-4">
              <Input
                type="text"
                className="form-control"
                name="name"
                placeholder="Nome da categoria"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name" className="col-sm-6 control-label">
              Categoria
              <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="col-sm-4">
              <Input
                type="text"
                className="form-control"
                name="name"
                placeholder="Nome da categoria"
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
                  marginTop: 70,
                  marginLeft: 725,
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
