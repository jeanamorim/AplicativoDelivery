/* eslint-disable react/button-has-type */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from 'react';
import './Header.css';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../store/modules/auth/actions';

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1000px)');
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <header className="Header">
      <img src={profile.image.url} className="Logo" alt="logo" />

      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <a href="/">Home</a>
          <a href="/categoria">Produtos</a>
          <a href="/orders">Pedidos</a>
          <a href="/oferta">Ofertas</a>

          <a href="/analise">Caixa</a>
          <a href="/configuracao">Configuração</a>
          <button onClick={handleSignOut}>Sair</button>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        🍔
      </button>
    </header>
  );
}
