/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from '../pages/Home';
import EstabelecimentoByCategory from '../pages/EstabelecimentoByCategory';
import OfertasPrincipal from '../components/OfertasPrincipal';
import ProductsLojas from '../pages/ProductsLojas';
import Cart from '../pages/Cart';
import DeliveryAddress from '../pages/CompleteOrder/DeliveryAddress';
import PaymentMethod from '../pages/CompleteOrder/PaymentMethod';
import PaymentResult from '../pages/CompleteOrder/PaymentResult';
import OrderConfirmation from '../pages/CompleteOrder/OrderConfirmation';
import Troco from '../pages/CompleteOrder/Troco';
import ProductDetails from '../pages/ProductDetails';
import DetalhesItens from '../pages/DetalhesItens';
import Search from '../pages/Search';
import Variacao from '../pages/Variacao';
import NewAdress from '../pages/NewAdress';
import InfoLojas from '../pages/InfoLojas';

const Stack = createStackNavigator();

export default function HomeRoutes({navigation, route}) {
  if (route.state && route.state.index > 0){
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: '#FFF',
        headerTitleStyle: {fontSize: 18},
        headerTransparent: false,

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
          title: null,
          headerStyle: {
          backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',
        }}
        name="EstabelecimentoByCategory"
        component={EstabelecimentoByCategory}
      />
      <Stack.Screen

        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: null,
          headerStyle: {
          backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',
        }}
        name="ProductsLojas"
        component={ProductsLojas}
      />
      <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),

        })}
        options={{
          title: 'Meu pedido',
          headerStyle: {
          backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',
        }}

        name="Cart"
        component={Cart}
      />
      <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'Produtos',
          headerStyle: {
          backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',
        }}
        name="ProductDetails"
        component={ProductDetails}
      />
      <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'Detalhes do item',
          headerStyle: {
          backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',
        }}
        name="DetalhesItens"
        component={DetalhesItens}
      />
      <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'Buscar produtos',
          headerStyle: {
          backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',
        }}
        name="Search"
        component={Search}
      />
      <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'Selecione a variação ',
          headerStyle: {
          backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',
        }}
        name="Variacao"
        component={Variacao}
      />
       <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'Endereço e pagamento',
          headerStyle: {
          backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',
        }}
        name="DeliveryAddress"
        component={DeliveryAddress}
      />

       <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'Selecione seu pagamento',
          headerStyle: {
          backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',
        }}
        name="PaymentMethod"
        component={PaymentMethod}
      />
        <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: null,
          headerStyle: {
          backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',
        }}
        name="Troco"
        component={Troco}
      />
       <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'Comfirme seu pedido',
          headerStyle: {
          backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',
        }}
        name="OrderConfirmation"
        component={OrderConfirmation}
      />
       <Stack.Screen

        options={{
          title: 'Resultado',
          headerShown: false,
        }}
        name="PaymentResult"
        component={PaymentResult}
      />
          <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'Informações da loja',
          headerStyle: {
          backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',
        }}
        name="InfoLojas"
        component={InfoLojas}
      />
          <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}
        options={{
          title: 'Endereço para entrega',
          headerStyle: {
          backgroundColor: '#f4a460',
          },
          headerTintColor: '#fff',
        }}
        name="NewAdress"
        component={NewAdress}
      />
        <Stack.Screen
        headerLeft={({navigation}) => ({
          onPress: navigation.goBack(),
        })}

        name="OfertasPrincipal"
        component={OfertasPrincipal}
      />

    </Stack.Navigator>
  );
}
