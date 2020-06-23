import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Variacao from '../Variacao';

import { Container, Buttonn } from './styles';

// import Animation from '../../components/Animation';
// import * as loadingData from '../../assets/animations/loading.json';

import api from '../../services/api';

export default function Categoria() {
  const [categories, setCategories] = useState([]);
  const [render, setRender] = useState(false);
  const [removing, setRemoving] = useState(0);
  const [modal, setModal] = useState(false);

  // const loading = <Animation width={30} height={30} animation={loadingData} />;

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await api.get('/categories');

        setCategories(response.data);
        if (removing !== 0) {
          setRemoving(0);
          toast.success('Categoria removida com sucesso');
        }
      } catch (err) {
        if (err.response) {
          toast.error('Erro no servidor');
        } else {
          toast.error('Erro ao conectar com o servidor');
        }
      }
    }

    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  return (
    <div className="content-wrapper">
      <div className="panel-body">
        <Container>
          <header>
            <strong>Categorias</strong>
          </header>
          <Buttonn>
            <header>
              <Link to="/nova-categoria">
                <button type="button" color="primary" variant="contained">
                  Adicionar Categoria
                </button>
              </Link>
              <Link to="/novo-produto">
                <button type="button" color="primary" variant="contained">
                  Adicionar Produtos
                </button>
              </Link>
            </header>
          </Buttonn>
          <ul>
            {categories.map(categoria => (
              <li key={categoria.id}>
                <Link
                  to={{
                    pathname: '/produtos',
                    search: `?id=${categoria.id}`,
                    state: {
                      orderData: categoria,
                    },
                  }}
                >
                  <header
                    style={{
                      backgroundImage: `url(${categoria.image.url})`,
                    }}
                  />
                </Link>

                <strong>{categoria.name}</strong>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </div>
  );
}
