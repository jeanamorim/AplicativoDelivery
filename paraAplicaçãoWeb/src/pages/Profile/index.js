import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Choice } from '@rocketseat/unform';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
// import { signOut } from '~/store/modules/auth/actions';
// import { updateProfileRequest } from '~/store/modules/user/actions';
import { updateProfileRequest } from '../../store/modules/user/actions';
import { Container } from './styles';
import Animation from '../../components/Animation';
import * as loadingData from '../../assets/animations/loading.json';
// import DatePicker from './DatePicker';

export default function Profile() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Digite seu Nome" />
        <Input
          type="text"
          name="last_name"
          placeholder="digite seu sobrenome"
        />
        <Input type="text" name="phone" placeholder="Digite seu telefone" />
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <hr />
        <DatePicker birthday={profile.birthday} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '25%',
          }}
          className="radio radio-info radio-container"
        >
          <Choice
            name="gender"
            options={[
              { value: 'm', label: 'Masculino' },
              { value: 'f', label: 'Feminino' },
            ]}
          />
        </div>
        <Input type="text" name="cpf" id="cpf" placeholder="Digite seu cpf" />
        <Input
          type="password"
          name="oldPassword"
          id="oldPassword"
          placeholder="Digite sua senha atual"
        />
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Digite sua nova senha"
        />
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Digite sua nova senha"
        />
        <button className="btn btn-primary btn-block" type="submit">
          {loading ? (
            <Animation width={30} height={30} animation={loadingData} />
          ) : (
            'Atualizar dados'
          )}
        </button>
      </Form>
    </Container>
  );
}
