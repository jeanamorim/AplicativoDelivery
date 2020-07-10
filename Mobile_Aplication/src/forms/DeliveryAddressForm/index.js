/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import translate from '../../locales';

import { SubmitButton, Input } from './styles';
import api from '../../services/api';
import { cepMask } from '../validation/masks';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  handleChangeText,
  handleBlur,
  handleSubmit,
} from '../validation/validations/deliveryAddressValidation';

import { Label, Picker, Item } from 'native-base';

export default function DeliveryAddressForm({ navigation }) {
  const [fieldErrors, setFieldErrors] = useState({});
  const [bairro, setBairro] = useState('');
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    street: '',
    street_n: '',

    city: '',
    state: '',
    complement: '',
    reference: '',
  });

  const streetRef = useRef();
  const streetNumberRef = useRef();
  const neighborhoodRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const complementRef = useRef();
  const referenceRef = useRef();

  const userId = useSelector(state => state.user.profile.id);

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
      setLoading(true);
      await api.post('/address_estab', {
        ...form,
        user_id: userId,
        postal_code: '49400-000',
        neighborhood: bairro,
        city: 'Lagarto',
        state: 'SE',
      });
      setForm({
        street: '',
        street_n: '',
        complement: '',
        reference: '',
      });
      setBairro('');

      setLoading(false);
      navigation.goBack();
    } else {
      let alltouched;
      Object.keys(errors).forEach(
        key => (alltouched = { ...alltouched, [key]: true }),
      );
      setTouched(alltouched);
      setFieldErrors(errors);
    }
  }

  function onValueChange2(value) {
    setBairro(value);
  }
  console.tron.log(bairro);
  return (
    <>
      <Label style={{ color: '#F4A460' }}>Rua</Label>
      <Input
        placeholder={'Rua avenida, travessa, etc'}
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
        error={fieldErrors.street && touched.street && fieldErrors.street}
      />
      <Label style={{ color: '#F4A460' }}>Numero</Label>
      <Input
        placeholder={'Digite o numero da casa'}
        maxLength={10}
        autoCorrect={false}
        isFocused={() => streetNumberRef.current.isFocused()}
        onChangeText={text => onChangeText('street_n', text)}
        onBlur={() => onBlur('street_n')}
        value={form.street_n}
        ref={streetNumberRef}
        returnKeyType="next"
        onSubmitEditing={() => neighborhoodRef.current.focus()}
        error={fieldErrors.street_n && touched.street_n && fieldErrors.street_n}
      />
      <Label style={{ color: '#F4A460' }}>Bairro</Label>
      <Item picker style={{ borderWidth: 2 }}>
        <Picker
          style={{ color: '#999' }}
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          placeholder={translate('neighborhood_placeholder')}
          selectedValue={bairro}
          onValueChange={onValueChange2}
          onBlur={() => onBlur('neighborhood')}>
          <Picker.Item label="CENTRO" value="CENTRO" />
          <Picker.Item label="ATM Card" value="key1" />
          <Picker.Item label="Debit Card" value="key2" />
          <Picker.Item label="Credit Card" value="key3" />
          <Picker.Item label="Net Banking" value="key4" />
        </Picker>
      </Item>

      <Label style={{ color: '#F4A460' }}>Complemento</Label>
      <Input
        placeholder={'Apto, bloco, sala...'}
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
          fieldErrors.complement && touched.complement && fieldErrors.complement
        }
      />
      <Label style={{ color: '#F4A460' }}>Referência</Label>
      <Input
        placeholder={'Próximo de, cor da casa...'}
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
          fieldErrors.reference && touched.reference && fieldErrors.reference
        }
      />

      <Label style={{ color: '#F4A460' }}>Cidade</Label>
      <Input editable={false} placeholder={'Lagarto'} />
      <Label style={{ color: '#F4A460' }}>Estado</Label>
      <Input editable={false} placeholder={'49400-000'} />

      <SubmitButton onPress={onSubmit} loading={loading}>
        Salvar
      </SubmitButton>
    </>
  );
}
