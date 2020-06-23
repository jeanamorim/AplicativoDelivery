import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';

//import translate from '../../locales';
//import SignInForm from '../../forms/SignInForm';

import Background from '../../components/Background';
import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo1.png';

import {
  Container,
  FormContainer,
  SignLink,
  SignLinkText,
  Input,
  SubmitButton,
} from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(email, password));
    setEmail('');
    setPassword('');
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <FormContainer loading={loading}>
          <Input
            icon="envelope"
            keyboardType="email-address"
            placeholder="Digite seu e-mail"
            autoCapitalize="none"
            autoCorrect={false}
            ref={emailRef}
            onChangeText={setEmail}
            //onBlur={() => onBlur('email')}
            value={email}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <Input
            icon="lock"
            secureTextEntry
            placeholder="digite sua senha"
            ref={passwordRef}
            onChangeText={setPassword}
            //onBlur={() => onBlur('password')}
            value={password}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar
          </SubmitButton>
        </FormContainer>
        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText> Criar conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
