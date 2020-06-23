/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button } from '@material-ui/core';
import { Form, Input } from '@rocketseat/unform';
import history from '../../services/history';
import ImageInput from '../../components/ImageInput';

import { Buttonn } from './styles';
import api from '../../services/api';

import translate from '../../locales';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome da categoria é obrigatório'),
  image_id: Yup.number().required('A Categoria precisa ter uma imagem'),
});

export default function Order() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState([]);

  const params = new URLSearchParams(useLocation().search);
  const id = params.get('id');

  async function handleEditUser(data) {
    try {
      await api.put(`categories/${id}`, data);
      toast.success('Categoria atualizado com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error(translate('server_error'));
      } else {
        toast.error(translate('server_connection_error'));
      }
    }
    history.push(`produtos?id=${id}`);
  }

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await api.get(`categories/${id}`);
        setName(res.data[0].name);

        setCategories(res.data);
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h2 className="page-title">{translate('add_category_title')}</h2>
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">Editar Categoria</div>
                  <div className="panel-body">
                    <Buttonn>
                      <header>
                        <Link to="/categoria">
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
                    {categories.map(categoria => (
                      <Form
                        id="vd-form"
                        className="form-horizontal"
                        schema={schema}
                        onSubmit={handleEditUser}
                      >
                        <div className="form-group">
                          <label
                            htmlFor="image_id"
                            className="col-sm-4 control-label"
                          >
                            {translate('category_image_label')}
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="info" />
                          <div className="col-sm-8">
                            <ImageInput name="image_id" source={name} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="name"
                            className="col-sm-4 control-label"
                          >
                            Categoria
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <div className="col-sm-4">
                            <Input
                              type="text"
                              className="form-control"
                              name="name"
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="col-sm-4 col-sm-offset-7">
                            <Buttonn>
                              <header>
                                <Button
                                  name="submit"
                                  type="submit"
                                  color="primary"
                                  variant="contained"
                                >
                                  Editar
                                </Button>
                              </header>
                            </Buttonn>
                          </div>
                        </div>
                      </Form>
                    ))}
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
