import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Background from '../../components/Background';
import { signUpRequest } from '../../store/modules/auth/actions';

import SignUpForm from '../../forms/SignUpForm';

import logo from '../../assets/logo1.png';

import {
  Container,
  Image,
  FormContainer,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  function handleFormSubmit({
    name,
    lastName,
    phone,
    cpf,
    gender,
    birthday,
    email,
    password,
  }) {
    dispatch(
      signUpRequest(
        name,
        lastName,
        phone,
        cpf,
        gender,
        birthday,
        email,
        password,
      ),
    );
  }

  return (
    <Background>
      <Container>
        <FormContainer>
          <Image source={logo} />
          <SignUpForm handleFormSubmit={handleFormSubmit} loading={loading} />
          <SignLink onPress={() => navigation.navigate('SignIn')}>
            <SignLinkText>Ja tenho uma conta</SignLinkText>
          </SignLink>
        </FormContainer>
      </Container>
    </Background>
  );
}
