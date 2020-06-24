/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';


import App from './App';
const Stack = createStackNavigator();
import {useSelector} from 'react-redux';
export default function Index() {
  const signed = useSelector(state => state.auth.signed);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {signed === true ? (
          <Stack.Screen name="App" component={App} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
