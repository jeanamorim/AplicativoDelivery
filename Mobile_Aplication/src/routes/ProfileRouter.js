/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../pages/Profile';
import DadosCadastrais from '../pages/Profile/DadosCadastrais';
import Address from '../pages/Profile/Address';

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

      initialRouteName="Profile">
      <Stack.Screen
          headerLeft={({navigation}) => ({
            onPress: navigation.goBack(),
          })}

        options={{
          title: 'Opções',
          headerStyle: {
          backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',
        }}
        name="Profile"
    component={Profile}

      />
      <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}

        options={{
          title: 'Dados cadastrais',
          headerStyle: {
            backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',

 }}
 name="DadosCadastrais"
 component={DadosCadastrais}

      />
           <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}

        options={{
          title: 'Endereço de entrega',
          headerStyle: {
            backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',

 }}
 name="Address"
 component={Address}

      />


    </Stack.Navigator>
  );
}
