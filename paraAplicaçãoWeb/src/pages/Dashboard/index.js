import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';

import api from '../../services/api';

export default function Dashboard() {
  const [status, setStatus] = useState();

  useEffect(() => {
    async function loadStatus() {
      try {
        const response = await axios.all([api.get('/productsList')]).then(
          axios.spread(products => ({
            products: products.data.length,
          }))
        );

        setStatus(response);
      } catch (err) {
        toast.error('Falha ao conectar com o servidor');
      }
    }
    loadStatus();
  }, []);

  const loading = <Animation width={40} height={40} animation={loadingData} />;

  return (
    <div className="content-wrapper" style={{ marginTop: 90 }}>
      <div className="container-fluid">
        <div className="col-md-3">
          <div className="panel panel-default">
            <div className="panel-body bk-success text-light">
              <div className="stat-panel text-center">
                <div className="stat-panel-number h1 ">
                  {status ? status.products : loading}
                </div>
                <div className="stat-panel-title text-uppercase">Produtos</div>
              </div>
            </div>
            <Link
              to="/categoria"
              className="block-anchor panel-footer text-center"
            >
              DETALHES &nbsp;
              <i className="fa fa-arrow-right" />
            </Link>
          </div>
        </div>
        <div className="col-md-3">
          <div className="panel panel-default">
            <div className="panel-body bk-success text-light">
              <div className="stat-panel text-center">
                <div className="stat-panel-number h1 ">
                  {status ? status.products : loading}
                </div>
                <div className="stat-panel-title text-uppercase">Produtos</div>
              </div>
            </div>
            <Link
              to="/categoria"
              className="block-anchor panel-footer text-center"
            >
              DETALHES &nbsp;
              <i className="fa fa-arrow-right" />
            </Link>
          </div>
        </div>

        <div className="col-md-3">
          <div className="panel panel-default">
            <div className="panel-body bk-warning text-light">
              <div className="stat-panel text-center">
                <div className="stat-panel-number h1 ">R$ 550,00</div>
                <div className="stat-panel-title text-uppercase">
                  Valor Total Vendas
                </div>
              </div>
            </div>
            <Link
              to="/analises"
              className="block-anchor panel-footer text-center"
            >
              Detalhes &nbsp;
              <i className="fa fa-arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
