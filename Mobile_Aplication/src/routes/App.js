/* eslint-disable prettier/prettier */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Profile from '../pages/Profile';
import HomeRoutes from './HomeRoutes';
import OrdersRoutes from './OrdersRoutes';
import SearchEstabelecimento from '../pages/SearchEstabelecimento';



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      unmountOnBlur
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#F4A460',
        inactiveTintColor: '#999',
        tabStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: 'rgba(0,0,0,0.1)',
          elevation: 3,
          color: '#999',

        },

      }}
    >
      <Tab.Screen
        name="HomeRoutes"
        component={HomeRoutes}
        options={{
          tabBarLabel: 'Home',

          tabBarIcon: ({color}) => (
            <Icon name="reorder" size={20} color={color} />
          ),
        }}
      />
         <Tab.Screen
        name="SearchEstabelecimento"
        component={SearchEstabelecimento}
        options={{
          tabBarLabel: 'Buscar',
          tabBarIcon: ({color}) => (
            <Icon name="search" size={20} color={color} />
          ),
        }}
      />
         <Tab.Screen
        name="OrdersRoutes"
        component={OrdersRoutes}
        options={{
          tabBarLabel: 'Meus pedidos',
          tabBarIcon: ({color}) => (
            <Icon name="receipt" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({color}) => (
            <Icon name="account-circle" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
