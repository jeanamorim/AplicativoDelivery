/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from '../pages/Home';
import EstabelecimentoByCategory from '../pages/EstabelecimentoByCategory';
import ProductsLojas from '../pages/ProductsLojas';
import Cart from '../pages/Cart';
import DeliveryAddress from '../pages/CompleteOrder/DeliveryAddress';
import PaymentMethod from '../pages/CompleteOrder/PaymentMethod';
import PaymentResult from '../pages/CompleteOrder/PaymentResult';
import OrderConfirmation from '../pages/CompleteOrder/OrderConfirmation';
import ProductDetails from '../pages/ProductDetails';
import DetalhesItens from '../pages/DetalhesItem';
import Search from '../pages/Search';
import Variacao from '../pages/Variacao';
import NewAdress from '../pages/NewAdress';
import BuscarCep from '../pages/BuscarCep';

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
        headerTransparent: true,


      }}
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'estabelecimento',
        }}
        name="EstabelecimentoByCategory"
        component={EstabelecimentoByCategory}
      />
      <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
        headerShown: false,

        }}
        name="ProductsLojas"
        component={ProductsLojas}
      />
      <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),

        })}
        options={{
          title: 'Carrinho',


        }}

        name="Cart"
        component={Cart}
      />
      <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'Detalhes do produto',
        }}
        name="ProductDetails"
        component={ProductDetails}
      />
      <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'Detalhes dos itens',
        }}
        name="DetalhesItens"
        component={DetalhesItens}
      />
      <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'buscar produto',
        }}
        name="Search"
        component={Search}
      />
      <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'variacao do produto',
        }}
        name="Variacao"
        component={Variacao}
      />
       <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'Endereços',
        }}
        name="DeliveryAddress"
        component={DeliveryAddress}
      />
       <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'pagamento',
        }}
        name="PaymentMethod"
        component={PaymentMethod}
      />
       <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'Comfirmacao',
        }}
        name="OrderConfirmation"
        component={OrderConfirmation}
      />
       <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'Resultado',
        }}
        name="PaymentResult"
        component={PaymentResult}
      />
          <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'Buscar CEP',
        }}
        name="BuscarCep"
        component={BuscarCep}
      />
          <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'Novo endereço',
        }}
        name="NewAdress"
        component={NewAdress}
      />
    </Stack.Navigator>
  );
}
