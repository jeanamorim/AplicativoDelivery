/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '../../components/Background';
import api from '../../services/api';
import { Button, Header, Text, Left, Body, Label, Select } from 'native-base';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function NewAdress({ navigation, route }) {
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
  const [dados, setDados] = useState([]);

  async function handleSubmit() {
    setLoading(true);
    await api.post('/address_estab', {
      user_id: userId,
      postal_code: 49400000,
      street,
      street_n,
      neighborhood,
      city: 'Lagarto',
      state: 'se',
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
      <ScrollView>
        <Container>
          <Form>
            <Label style={{ color: '#F4A460' }}>CEP</Label>
            <FormInput
              editable={false}
              style={{ marginTop: 10 }}
              autoCorrect={false}
              placeholder="Cep"
              returnKeyType="send"
              onSubmitEditing={() => streetRef.current.focus()}
              value="49400-000"
              onChangeText={setPostal_code}
            />
            <Label style={{ color: '#F4A460' }}>Rua</Label>
            <FormInput
              required
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Rua, avenida.."
              ref={streetRef}
              onSubmitEditing={() => street_nRef.current.focus()}
              value={street}
              onChangeText={setStreet}
            />
            <Label style={{ color: '#F4A460' }}>Numero</Label>
            <FormInput
              keyboardType="numeric"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Numero"
              ref={street_nRef}
              onSubmitEditing={() => neighborhoodRef.current.focus()}
              value={street_n}
              onChangeText={setStreet_n}
            />
            <Label style={{ color: '#F4A460' }}>Bairro</Label>
            <FormInput
              autoCorrect={false}
              placeholder="Bairro"
              ref={neighborhoodRef}
              returnKeyType="send"
              onSubmitEditing={() => cityRef.current.focus()}
              value={neighborhood}
              onChangeText={setNeighborhood}
            />
            <Label style={{ color: '#F4A460' }}>Cidade</Label>
            <FormInput
              editable={false}
              autoCorrect={false}
              placeholder="Cidade"
              ref={cityRef}
              returnKeyType="send"
              onSubmitEditing={() => stateRef.current.focus()}
              value="Lagarto"
              onChangeText={setCity}
            />
            <Label style={{ color: '#F4A460' }}>Estado</Label>
            <FormInput
              editable={false}
              autoCorrect={false}
              placeholder="Estado"
              ref={stateRef}
              returnKeyType="send"
              onSubmitEditing={() => complementRef.current.focus()}
              value="Sergipe"
              onChangeText={setState}
            />
            <Label style={{ color: '#F4A460' }}>Complemento</Label>
            <FormInput
              autoCorrect={false}
              placeholder="Complemento"
              ref={complementRef}
              returnKeyType="send"
              onSubmitEditing={() => referenceRef.current.focus()}
              value={complement}
              onChangeText={setComplement}
            />
            <Label style={{ color: '#F4A460' }}>Referência</Label>
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
