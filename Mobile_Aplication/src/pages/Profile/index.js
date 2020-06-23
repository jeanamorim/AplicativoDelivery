import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Background from '../../components/Background';
import { updateProfileRequest } from '../../store/modules/user/actions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ProfileForm from '../../forms/ProfileForm';

import { Container, FormContainer } from './styles';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.user.loading);

  function handleFormSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Background>
      <Container>
        <FormContainer>
          <ProfileForm handleFormSubmit={handleFormSubmit} loading={loading} />
        </FormContainer>
      </Container>
    </Background>
  );
}
Profile.navigationOptions = {
  tabBarLabel: 'Minha conta',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="user" size={20} color={tintColor} />
  ),
};
