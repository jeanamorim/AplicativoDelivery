/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';
import history from '../../services/history';
import { formatPrice } from '../../util/format';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
import api from '../../services/api';
import Table from '../../components/Table';

import { Containerr, Buttonn } from './styles';

export default function Products({ location }) {
  const { state } = location;
  const [render, setRender] = useState(false);
  const [removing, setRemoving] = useState(0);
  const [removingCategorias, setRemovingCategorias] = useState(0);
  const [categories, setCategories] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const params = new URLSearchParams(useLocation().search);
  const ids = params.get('id');

  async function handleRemoveCategoria(id) {
    try {
      setRemoving(id);
      await api.delete(`/categories/${id}`);
      setRender(!render);
      toast.success('Categoria removido com sucesso');
    } catch (err) {
      if (err.response) {
        toast.error(
          'Não é possivel excluir uma categoria que possui produtos. Por favor verifique.'
        );
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }

  useEffect(() => {
    async function loadOrder() {
      try {
        const response = await api.get(`products/${ids}`);

        setOrderData(response.data);
        if (removing !== 0) {
          setRemoving(0);
          toast.success('Produto removido com sucesso');
        }
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Falha ao conectar com o servidor');
        }
      }
    }

    loadOrder();
  }, [ids, removing, state]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get(`categories/${ids}`);

        setCategories(response.data);
        if (removingCategorias !== 0) {
          setRemovingCategorias(0);
          toast.success('Categoria removida com sucesso');
        }
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
  }, [render]);

  async function handleRemove(id) {
    try {
      setRemoving(id);
      await api.delete(`/products/${id}`);
      setRender(!render);
    } catch (err) {
      if (err.response) {
        toast.error('Erro no servidor');
      } else {
        toast.error('Falha ao conectar com o servidor');
      }
    }
  }

  const loading = <Animation width={30} height={30} animation={loadingData} />;

  let data;

  if (orderData) {
    data = orderData.map(product => ({
      image: (
        <img
          src={product.image.url}
          style={{ width: 50, height: 50 }}
          alt={product.name}
        />
      ),
      name: product.name,
      category: product.category.name,
      description: product.description,

      price: formatPrice(product.price),
      action:
        removing === product.id ? (
          <div
            style={{
              paddingTop: 10,
            }}
          >
            {loading}
          </div>
        ) : (
          <div
            style={{
              lineHeight: '50px',
              textAlign: 'center',
            }}
          >
            <i
              role="presentation"
              onKeyPress={() => handleRemove(product.id)}
              onClick={() => {
                if (
                  window.confirm(
                    `Tem certeza que deseja remover o produto ${product.name} ?`
                  )
                )
                  handleRemove(product.id);
              }}
              // pencil icon editar
              className="fa fa-trash"
              style={{
                color: '#f00',
                cursor: 'pointer',
              }}
            />
          </div>
        ),
    }));
  }

  const columns = [
    {
      label: 'Imagem',
      field: 'image',
      sort: 'asc',
      width: 10,
    },
    {
      label: 'Nome',
      field: 'name',
      sort: 'asc',
      width: 10,
    },
    {
      label: 'Categoria',
      field: 'category',
      sort: 'asc',
      width: 30,
    },
    {
      label: 'Descrição',
      field: 'description',
      sort: 'asc',
      width: 30,
    },

    {
      label: 'Preço',
      field: 'price',
      sort: 'asc',
      width: 20,
    },
    {
      label: 'Apagar',
      field: 'action',
      sort: 'asc',
      width: 20,
    },
    {
      label: 'Editar',
      field: 'action',
      sort: 'asc',
      width: 20,
    },
  ];

  const rows = [
    {
      id: loading,
      image: loading,
      name: loading,
      category: loading,
      description: loading,

      price: loading,
      action: loading,
    },
  ];

  return (
    <div className="content-wrapper" style={{ marginTop: 80 }}>
      <div className="panel-body">
        <Containerr>
          <div>
            <Link to="/categoria">
              <Button
                variant="contained"
                color="primary"
                startIcon={<ArrowBackIcon />}
              >
                Voltar
              </Button>
            </Link>
          </div>

          <ul>
            <header>
              <strong>Categorias</strong>
            </header>

            {categories.map(categoria => (
              <li key={categoria.id}>
                <header
                  style={{
                    backgroundImage: `url(${categoria.image.url})`,
                  }}
                />
              </li>
            ))}
            {categories.map(categoria => (
              <header key={categoria.id}>
                <strong>{categoria.name}</strong>
              </header>
            ))}
          </ul>

          <Buttonn>
            {categories.map(categoria => (
              <header key={categoria.id}>
                <Link to="/nova-categoria">
                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={<AddIcon />}
                  >
                    Adicionar Categoria
                  </Button>
                </Link>
                <Link to="/novo-produto">
                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={<AddIcon />}
                  >
                    Adicionar Produto
                  </Button>
                </Link>

                <Link to="/categoria">
                  <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onKeyPress={() => handleRemoveCategoria(categoria.id)}
                    onClick={() => {
                      if (
                        window.confirm(
                          `Tem certeza que deseja remover a categoria ${categoria.name} ?`
                        )
                      )
                        handleRemoveCategoria(categoria.id);
                    }}
                  >
                    Remover Categoria
                  </Button>
                </Link>

                <Link
                  to={{
                    pathname: '/editCategoria',
                    search: `?id=${categoria.id}`,
                    state: {
                      orderData: categoria,
                    },
                  }}
                >
                  <Button
                    color="secondary"
                    variant="contained"
                    startIcon={<MdModeEdit />}
                  >
                    Editar Categoria
                  </Button>
                </Link>
              </header>
            ))}
          </Buttonn>
        </Containerr>
        <div className="panel-body">
          <Table rows={data || rows} columns={columns} />
        </div>
      </div>
    </div>
  );
}
Products.propTypes = {
  location: PropTypes.shape().isRequired,
};
