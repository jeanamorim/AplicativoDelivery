import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Configuracao from '../pages/Configuracao';
import Pedidos from '../pages/Pedidos';
import Categoria from '../pages/Categoria';
import Suporte from '../pages/Suporte';
import AddCategoria from '../pages/AddCategoria';
import AddProduto from '../pages/AddProdutos';
import Produtos from '../pages/Product';
import DetailsPedido from '../pages/DetailsPedido';
import ListaPedidos from '../pages/ListaPedidos';
import Analises from '../pages/Analises';
import Ofertas from '../pages/Ofertas';
import NovaOferta from '../pages/AddOfertas';
import EditCategoria from '../pages/EditCategoria';
import Variacao from '../pages/Variacao';
import OpcaoVariacao from '../pages/Opcoes';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/configuracao" component={Configuracao} isPrivate />
      <Route path="/pedidos" component={Pedidos} isPrivate />
      <Route path="/categoria" component={Categoria} isPrivate />
      <Route path="/suporte" component={Suporte} isPrivate />
      <Route path="/nova-categoria" component={AddCategoria} isPrivate />
      <Route path="/novo-produto" component={AddProduto} isPrivate />
      <Route path="/produtos" component={Produtos} isPrivate />
      <Route path="/pedido" component={DetailsPedido} isPrivate />
      <Route path="/lista" component={ListaPedidos} isPrivate />
      <Route path="/analises" component={Analises} isPrivate />
      <Route path="/ofertas" component={Ofertas} isPrivate />
      <Route path="/newOferta" component={NovaOferta} isPrivate />
      <Route path="/editCategoria" component={EditCategoria} isPrivate />
      <Route path="/variacao" component={Variacao} isPrivate />
      <Route path="/opcao" component={OpcaoVariacao} isPrivate />
    </Switch>
  );
}
