/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import translate from '../../locales';

import {
  SubmitButton,
  Card,
  CardHeader,
  CardTitle,
  Title,
  Subtitle,
  CheckoutButton,
  Container,
  SubmitButtonEdit,
} from './styles';

import {
  Input,
  Item,
  Content,
  Form,
  Label,
  Footer,
  FooterTab,
  Button,
} from 'native-base';
import api from '../../services/api';
import { cepMask } from '../validation/masks';

import {
  handleChangeText,
  handleBlur,
  handleSubmit,
} from '../validation/validations/deliveryAddressValidation';

export default function DeliveryAddressForm({ handleFormSubmit, loading }) {
  const [lockForm, setLockForm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [haveAddress, setHaveAddress] = useState(false);
  const [touched, setTouched] = useState({});
  const [editar, setEditar] = useState(true);
  const [endereco, setEndereco] = useState([]);
  const [form, setForm] = useState({
    addressee: '',
    postal_code: '',
    street: '',
    street_n: '',
    neighborhood: '',
    city: '',
    state: '',
    complement: '',
    reference: '',
  });

  const edita = () => {
    editar ? setEditar(false) : setEditar(true);
  };

  const addresseeRef = useRef();
  const postalCodeRef = useRef();
  const streetRef = useRef();
  const streetNumberRef = useRef();
  const neighborhoodRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const complementRef = useRef();
  const referenceRef = useRef();

  const iduser = useSelector(state => state.user.profile.id);
  const userName = useSelector(state => state.user.profile.name);

  useEffect(() => {
    async function checkHaveAddress() {
      setLockForm(true);
      const response = await api.get('address');
      console.tron.log(response.data);
      setEndereco(response.data);
      if (response.data) {
        setHaveAddress(true);

        const data = {
          ...response.data,
          postal_code: cepMask(response.data.postal_code),
          addressee: userName,
        };

        setForm(data);
        setLockForm(false);
      } else {
        setLockForm(false);
      }
    }

    checkHaveAddress();
  }, [iduser, userName]);

  async function onChangeText(id, value) {
    const { errors, text } = await handleChangeText(form, id, value);
    if (errors) {
      setFieldErrors(errors);
    } else {
      const { [id]: _, ...rest } = fieldErrors;
      setFieldErrors(rest);
    }

    setForm({ ...form, [id]: text });
  }

  async function onBlur(id) {
    if (!touched[id]) {
      setTouched({ ...touched, [id]: true });

      const errors = await handleBlur(form);

      if (errors) {
        setFieldErrors(errors);
      } else {
        const { [id]: _, ...rest } = fieldErrors;
        setFieldErrors(rest);
      }
    }
  }

  async function onSubmit() {
    const errors = await handleSubmit(form);

    if (!errors) {
      handleFormSubmit(form, haveAddress);
    } else {
      let alltouched;
      Object.keys(errors).forEach(
        key => (alltouched = { ...alltouched, [key]: true }),
      );
      setTouched(alltouched);
      setFieldErrors(errors);
    }
  }

  return (
    <>
      {editar ? (
        <Container>
          <Content>
            <Card style={{ elevation: 9 }}>
              <CardHeader>
                <Icon size={25} name="local-shipping" color="#F4A460" />
                <CardTitle>Informações da entrega</CardTitle>
              </CardHeader>

              <Title>Endereço de entrega</Title>

              <Subtitle key={endereco.id}>{`${endereco.street}, ${
                endereco.street_n
              } - ${endereco.city}\n${endereco.neighborhood}\n${
                endereco.complement
              }\n${endereco.reference}`}</Subtitle>

              <Title>Valor da entrega</Title>
              <Subtitle>R$ 10</Subtitle>

              <CheckoutButton onPress={edita} loading={loading} type="button">
                <Text style={{ color: '#f4a460' }}>EDITAR ENDEREÇO</Text>
              </CheckoutButton>
            </Card>
          </Content>

          <Footer>
            <FooterTab style={{ backgroundColor: '#F4A460' }}>
              <Button onPress={onSubmit} loading={loading}>
                <Text style={{ fontSize: 15, color: '#fff' }}>Pagamento</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      ) : (
        <Container>
          <ScrollView>
            <Content>
              <Form>
                <Item floatingLabel>
                  <Label style={{ color: '#F4A460' }}>Nome</Label>
                  <Input
                    editable={!lockForm}
                    placeholder="Seu nome"
                    maxLength={50}
                    autoCorrect={false}
                    autoCapitalize="words"
                    ref={addresseeRef}
                    isFocused={() => addresseeRef.current.isFocused()}
                    onChangeText={text => onChangeText('addressee', text)}
                    onBlur={() => onBlur('addressee')}
                    value={form.addressee}
                    returnKeyType="next"
                    onSubmitEditing={() => postalCodeRef.current.focus()}
                    error={
                      fieldErrors.addressee &&
                      touched.addressee &&
                      fieldErrors.addressee
                    }
                  />
                </Item>
                <Item floatingLabel>
                  <Label style={{ color: '#F4A460' }}>CEP</Label>
                  <Input
                    editable={!lockForm}
                    placeholder="Cep"
                    maxLength={9}
                    autoCorrect={false}
                    keyboardType="numeric"
                    isFocused={() => postalCodeRef.current.isFocused()}
                    onChangeText={text => onChangeText('postal_code', text)}
                    onBlur={() => onBlur('postal_code')}
                    value={form.postal_code}
                    ref={postalCodeRef}
                    returnKeyType="next"
                    onSubmitEditing={() => streetRef.current.focus()}
                    error={
                      fieldErrors.postal_code &&
                      touched.postal_code &&
                      fieldErrors.postal_code
                    }
                  />
                </Item>
                <Item floatingLabel>
                  <Label style={{ color: '#F4A460' }}>Endereço</Label>
                  <Input
                    editable={!lockForm}
                    placeholder="Rua, aveniida, travessa, etc"
                    maxLength={100}
                    autoCorrect={false}
                    autoCapitalize="words"
                    isFocused={() => streetRef.current.isFocused()}
                    onChangeText={text => onChangeText('street', text)}
                    onBlur={() => onBlur('street')}
                    value={form.street}
                    ref={streetRef}
                    returnKeyType="next"
                    onSubmitEditing={() => streetNumberRef.current.focus()}
                    error={
                      fieldErrors.street && touched.street && fieldErrors.street
                    }
                  />
                </Item>
                <Item floatingLabel>
                  <Label style={{ color: '#F4A460' }}>Numero</Label>
                  <Input
                    editable={!lockForm}
                    placeholder="Digite o numero"
                    maxLength={10}
                    autoCorrect={false}
                    isFocused={() => streetNumberRef.current.isFocused()}
                    onChangeText={text => onChangeText('street_n', text)}
                    onBlur={() => onBlur('street_n')}
                    value={form.street_n}
                    ref={streetNumberRef}
                    returnKeyType="next"
                    onSubmitEditing={() => neighborhoodRef.current.focus()}
                    error={
                      fieldErrors.street_n &&
                      touched.street_n &&
                      fieldErrors.street_n
                    }
                  />
                </Item>
                <Item floatingLabel>
                  <Label style={{ color: '#F4A460' }}>Bairro</Label>
                  <Input
                    editable={!lockForm}
                    placeholder="Selecione o bairro"
                    maxLength={50}
                    autoCorrect={false}
                    autoCapitalize="words"
                    isFocused={() => neighborhoodRef.current.isFocused()}
                    onChangeText={text => onChangeText('neighborhood', text)}
                    onBlur={() => onBlur('neighborhood')}
                    value={form.neighborhood}
                    ref={neighborhoodRef}
                    returnKeyType="next"
                    onSubmitEditing={() => cityRef.current.focus()}
                    error={
                      fieldErrors.neighborhood &&
                      touched.neighborhood &&
                      fieldErrors.neighborhood
                    }
                  />
                </Item>
                <Item floatingLabel>
                  <Label style={{ color: '#F4A460' }}>Cidade</Label>
                  <Input
                    editable={!lockForm}
                    placeholder="sua cidade"
                    maxLength={50}
                    autoCorrect={false}
                    autoCapitalize="words"
                    isFocused={() => cityRef.current.isFocused()}
                    onChangeText={text => onChangeText('city', text)}
                    onBlur={() => onBlur('city')}
                    value={form.city}
                    ref={cityRef}
                    returnKeyType="next"
                    onSubmitEditing={() => stateRef.current.focus()}
                    error={fieldErrors.city && touched.city && fieldErrors.city}
                  />
                </Item>
                <Item floatingLabel>
                  <Label style={{ color: '#F4A460' }}>Estado</Label>
                  <Input
                    editable={!lockForm}
                    placeholder="Seu estado"
                    maxLength={2}
                    autoCorrect={false}
                    isFocused={() => stateRef.current.isFocused()}
                    autoCapitalize="characters"
                    onChangeText={text => onChangeText('state', text)}
                    onBlur={() => onBlur('state')}
                    value={form.state}
                    ref={stateRef}
                    returnKeyType="next"
                    onSubmitEditing={() => complementRef.current.focus()}
                    error={
                      fieldErrors.state && touched.state && fieldErrors.state
                    }
                  />
                </Item>
                <Item floatingLabel>
                  <Label style={{ color: '#F4A460' }}>Complemento</Label>
                  <Input
                    editable={!lockForm}
                    placeholder="Casa, apartamento, sobrado"
                    autoCorrect={false}
                    autoCapitalize="words"
                    isFocused={() => complementRef.current.isFocused()}
                    onChangeText={text => onChangeText('complement', text)}
                    onBlur={() => onBlur('complement')}
                    value={form.complement}
                    ref={complementRef}
                    returnKeyType="next"
                    onSubmitEditing={() => referenceRef.current.focus()}
                    error={
                      fieldErrors.complement &&
                      touched.complement &&
                      fieldErrors.complement
                    }
                  />
                </Item>
                <Item floatingLabel>
                  <Label style={{ color: '#F4A460' }}>
                    Ponto de referência
                  </Label>
                  <Input
                    editable={!lockForm}
                    placeholder="Cor da casa, proximo de..."
                    autoCorrect={false}
                    autoCapitalize="words"
                    isFocused={() => referenceRef.current.isFocused()}
                    onChangeText={text => onChangeText('reference', text)}
                    onBlur={() => onBlur('reference')}
                    value={form.reference}
                    ref={referenceRef}
                    returnKeyType="send"
                    onSubmitEditing={onSubmit}
                    error={
                      fieldErrors.reference &&
                      touched.reference &&
                      fieldErrors.reference
                    }
                  />
                </Item>
              </Form>
            </Content>
          </ScrollView>
          <Footer>
            <FooterTab style={{ backgroundColor: '#F4A460' }}>
              <Button onPress={onSubmit} loading={loading}>
                <Text style={{ fontSize: 15, color: '#fff' }}>Comfirmar</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      )}
    </>
  );
}
