import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../../assets/img/HeaderTrans.png';
import avatar from '../../assets/img/ts-avatar.jpg';
import { Menu, LinkMenu } from './styles';
import { signOut } from '../../store/modules/auth/actions';
import { toggleMenu } from '../../store/modules/misc/actions';

export default function Header() {
  const dispatch = useDispatch();
  const show = useSelector(state => state.misc.show);

  function handleSignOut() {
    dispatch(signOut());
  }

  function handleToggleMenu() {
    dispatch(toggleMenu(!show));
  }

  return (
    <div className="brand clearfix">
      <Link to="/" className="logo">
        <img src={logo} className="img-responsive" alt="" />
      </Link>
      <span role="presentation" className="menu-btn" onClick={handleToggleMenu}>
        <i className="fa fa-bars" />
      </span>
      <Menu>
        <nav>
          <LinkMenu className="active" to="/dashboard">
            Inicio
          </LinkMenu>
          <LinkMenu className="active" to="/categoria">
            Produtos
          </LinkMenu>
          <LinkMenu className="active" to="/pedidos">
            Pedidos
          </LinkMenu>
          <LinkMenu to="/ofertas">Ofertas</LinkMenu>
          <LinkMenu to="/analises">Relatório</LinkMenu>
          <LinkMenu to="/configuracao">Configuração</LinkMenu>
          <LinkMenu to="/suporte">Suporte</LinkMenu>
        </nav>
      </Menu>

      <ul className="ts-profile-nav">
        <li className="ts-account">
          <Link to={location => location.pathname}>
            <img src={avatar} className="ts-avatar hidden-side" alt="" />
            Conta
            <i className="fa fa-angle-down hidden-side" />
          </Link>
          <ul>
            <li>
              <Link to="/profile">Perfil</Link>
            </li>
            <li>
              <Link to="/" onClick={handleSignOut}>
                Sair
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
