/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '../../components/Background';
import api from '../../services/api';
import { Button, Header, Text, Left, Body } from 'native-base';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function NewAdress({ navigation }) {
  const streetRef = useRef();
  const street_nRef = useRef();
  const neighborhoodRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const complementRef = useRef();
  const referenceRef = useRef();

  const [postal_code, setPostal_code] = useState('');
  const [street, setStreet] = useState('');
  const [street_n, setStreet_n] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [complement, setComplement] = useState('');
  const [reference, setReference] = useState('');
  const userId = useSelector(state => state.user.profile.id);
  const [loading, setLoading] = useState(false);

  const dado = navigation.getParam('dados');

  async function handleSubmit() {
    setLoading(true);
    await api.post('/address_estab', {
      user_id: userId,
      postal_code: dado.cep,
      street,
      street_n,
      neighborhood,
      city: dado.localidade,
      state: dado.uf,
      complement,
      reference,
    });
    setLoading(false);
    setPostal_code('');
    setStreet('');
    setStreet_n('');
    setNeighborhood('');
    setCity('');
    setState('');
    setComplement('');
    setReference('');
  }

  return (
    <Background>
      <Header style={{ backgroundColor: '#F4A460', height: 50 }}>
        <Left>
          <Button transparent>
            <Icon
              color="#fff"
              size={25}
              name="arrow-back"
              onPress={() => navigation.navigate('ProductDetails')}
            />
          </Button>
        </Left>
        <Body>
          <Text
            style={{
              marginLeft: 0,
              marginTop: 4,
              color: '#fff',
              fontFamily: 'CerebriSans-ExtraBold',
              fontSize: 20,
            }}>
            Detalhes do item
          </Text>
        </Body>
      </Header>
      <ScrollView>
        <Container>
          <Form>
            <FormInput
              editable={false}
              style={{ marginTop: 10 }}
              autoCorrect={false}
              placeholder="Cep"
              returnKeyType="send"
              onSubmitEditing={() => streetRef.current.focus()}
              value={dado.cep}
              onChangeText={setPostal_code}
            />
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Rua, avenida.."
              ref={streetRef}
              onSubmitEditing={() => street_nRef.current.focus()}
              value={street}
              onChangeText={setStreet}
            />
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Numero"
              ref={street_nRef}
              onSubmitEditing={() => neighborhoodRef.current.focus()}
              value={street_n}
              onChangeText={setStreet_n}
            />
            <FormInput
              autoCorrect={false}
              placeholder="Bairro"
              ref={neighborhoodRef}
              returnKeyType="send"
              onSubmitEditing={() => cityRef.current.focus()}
              value={neighborhood}
              onChangeText={setNeighborhood}
            />
            <FormInput
              editable={false}
              autoCorrect={false}
              placeholder="Cidade"
              ref={cityRef}
              returnKeyType="send"
              onSubmitEditing={() => stateRef.current.focus()}
              value={dado.localidade}
              onChangeText={setCity}
            />
            <FormInput
              editable={false}
              autoCorrect={false}
              placeholder="Estado"
              ref={stateRef}
              returnKeyType="send"
              onSubmitEditing={() => complementRef.current.focus()}
              value={dado.uf}
              onChangeText={setState}
            />
            <FormInput
              autoCorrect={false}
              placeholder="Complemento"
              ref={complementRef}
              returnKeyType="send"
              onSubmitEditing={() => referenceRef.current.focus()}
              value={complement}
              onChangeText={setComplement}
            />
            <FormInput
              autoCorrect={false}
              placeholder="Referência"
              ref={referenceRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              value={reference}
              onChangeText={setReference}
            />
          </Form>
        </Container>
      </ScrollView>
      {loading ? (
        <ActivityIndicator color="#F4A460" size="small" />
      ) : (
        <SubmitButton
          onPress={() => {
            handleSubmit();
          }}>
          Cadastrar novo endereço
        </SubmitButton>
      )}
    </Background>
  );
}
