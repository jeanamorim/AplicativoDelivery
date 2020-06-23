/* eslint-disable prettier/prettier */
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from '../pages/Home';
import EstabelecimentoByCategory from '../pages/EstabelecimentoByCategory';
import ProductsLojas from '../pages/ProductsLojas';
import Cart from '../pages/Cart';
import DeliveryAddress from '../pages/CompleteOrder/DeliveryAddress';
import PaymentMethod from '../pages/CompleteOrder/PaymentMethod';
import PaymentResult from '../pages/CompleteOrder/PaymentResult';
import OrderConfirmation from '../pages/CompleteOrder/OrderConfirmation';
import Orders from '../pages/Pedidos/Orders';
import OrdersDetails from '../pages/Pedidos/OrderDetails';
import ProductDetails from '../pages/ProductDetails';
import DetalhesItens from '../pages/DetalhesItem';
import Search from '../pages/Search';
import Variacao from '../pages/Variacao';
import Modal from '../pages/Modal';
import NewAdress from '../pages/NewAdress';
import BuscarCep from '../pages/BuscarCep';

import SearchEstabelecimento from '../pages/SearchEstabelecimento';


import Profile from '../pages/Profile';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Home,
            SearchEstabelecimento,
            pedido: {
              screen: createStackNavigator({
                Orders,
                OrdersDetails,
                NewAdress,
                EstabelecimentoByCategory,
                ProductsLojas,
                DeliveryAddress,
                BuscarCep,


              },     {
                defaultNavigationOptions: {
                  headerShown: false,
                },
              }),
              navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Meus pedidos',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="receipt" size={20} color={tintColor} />
                ),
              },
            },
            Profile,



            //tela inicial do app
            /*
            Home: {
              screen: createStackNavigator({
                Home,
            },
              {
                defaultNavigationOptions: {
                  headerTransparent: false,
                  headerTintColor: '#fff',
                  headerShown: false,
                  headerStyle: { backgroundColor: '#F4A460' },
                  headerLeftContainerStyle: {
                    marginLeft: 10,
                    alignContent: 'center',

                  },
                },
              }),
              navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Home',
              tabBarIcon: (<Icon name="home" size={20} color="#fff" />),
              },
            },
             /*
            //tela final

            Orders: {
              screen: createStackNavigator({
                Orders,
                OrdersDetails,
              },
              {
                defaultNavigationOptions: {
                  headerTransparent: false,
                  headerTintColor: '#fff',
                  headerStyle: { backgroundColor: '#F4A460' },
                  headerLeftContainerStyle: {
                    marginLeft: 10,

                  },
                },
              }),
              navigationOptions: {

                tabBarLabel: 'Meu pedidos',

                tabBarIcon: (<Icon name="home" size={20} color="#fff" />),
              },
            },
  */

          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#F4A460',
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#fff',
                elevation: 3,
                color: '#999',
              },
            },
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      },
    ),
  );
