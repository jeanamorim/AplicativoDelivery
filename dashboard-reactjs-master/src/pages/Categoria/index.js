/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { Container } from './styles';

// import Animation from '../../components/Animation';
// import * as loadingData from '../../assets/animations/loading.json';

import api from '../../services/api';

export default function Categoria() {
  const [categories, setCategories] = useState([]);

  const [removing, setRemoving] = useState(0);

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
  }, []);

  return (
    <div className="content-wrapper" style={{ marginTop: 40 }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">Categorias</div>
                  <div className="content-wrapper">
                    <div className="panel-body">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/categorias">
                          <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            style={{ background: '#32cd32', color: '#fff' }}
                          >
                            Adicionar Categoria
                          </Button>
                        </Link>
                        <Link to="/produtos">
                          <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            style={{
                              background: '#32cd32',
                              color: '#fff',
                              margin: 3,
                            }}
                          >
                            Adicionar Produto
                          </Button>
                        </Link>
                      </div>
                      <Container>
                        <ul>
                          {categories.map(categoria => (
                            <li key={categoria.id}>
                              <Link
                                to={{
                                  pathname: '/produto',
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
