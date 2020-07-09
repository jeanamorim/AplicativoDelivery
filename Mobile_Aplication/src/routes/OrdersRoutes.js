/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Orders from '../pages/Pedidos/Orders';
import OrdersDetails from '../pages/Pedidos/OrderDetails';

const Stack = createStackNavigator();

export default function Delivery() {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: '#FFF',
        headerTitleStyle: {fontSize: 18},
        headerTransparent: false,
        tabBarVisible: false,


      }}

      initialRouteName="Orders">
      <Stack.Screen
          headerLeft={({navigation}) => ({
            onPress: navigation.goBack(),
          })}

        options={{
          title: 'Pedidos',
          headerStyle: {
          backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',
        }}
        name="Orders"
    component={Orders}

      />
      <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}

        options={{
          title: 'Detalhes do pedido',
          headerStyle: {
            backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',

 }}
 name="OrdersDetails"
 component={OrdersDetails}

      />


    </Stack.Navigator>
  );
}
