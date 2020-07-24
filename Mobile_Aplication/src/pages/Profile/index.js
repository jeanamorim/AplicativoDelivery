/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Background from '../../components/Background';
import { signOut } from '../../store/modules/auth/actions';
import { Container } from './styles';
import { Card, ListItem, Thumbnail, Body, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default function Profile({ navigation }) {
  const name = useSelector(state => state.user.profile.name);
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Background>
      <Container>
        <Card style={{ marginTop: 20 }}>
          <ListItem>
            <Thumbnail
              source={{
                uri: 'https://api.adorable.io/avatars/50/abott@adorable.png',
              }}
            />
            <Body>
              <Text>{name}</Text>
              <Text note>+55 79 99834-3074</Text>
            </Body>
          </ListItem>
        </Card>
        <Card>
          <ListItem onPress={() => navigation.navigate('DadosCadastrais')}>
            <Icon name="grin-beam" size={25} />
            <Body>
              <Text>Meus Dados cadastrais</Text>
            </Body>
          </ListItem>
        </Card>
        <Card>
          <ListItem onPress={() => navigation.navigate('Address')}>
            <Icon name="motorcycle" size={25} />
            <Body>
              <Text>Meu endereço de entrega</Text>
            </Body>
          </ListItem>
        </Card>
        <Card>
          <ListItem>
            <Icon name="user-friends" size={25} />
            <Body>
              <Text>Falar com nosso time</Text>
            </Body>
          </ListItem>
        </Card>
        <Card>
          <ListItem>
            <Icon name="kiss-wink-heart" size={25} />
            <Body>
              <Text>Avalie o app</Text>
            </Body>
          </ListItem>
        </Card>
        <Card>
          <ListItem onPress={() => handleSignOut()}>
            <Body>
              <Text style={{ alignSelf: 'center', color: '#f00' }}>
                Sair do app
              </Text>
            </Body>
          </ListItem>
        </Card>
      </Container>
    </Background>
  );
}
//Profile.navigationOptions = {
// tabBarLabel: 'Minha conta',
// tabBarIcon: ({ tintColor }) => (
// <Icon name="user" size={20} color={tintColor} />
// ),
//};
