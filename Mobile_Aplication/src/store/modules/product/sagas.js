import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import {
  addToGetCartSucess,
  removeFromCartSucess,
  removeFromCartFailed,
} from './actions';
import api from '../../../services/api';

function* getCartProducts({ payload }) {
  const { id } = payload;

  const { data } = yield call(api.get, `cart/${id}`);

  yield put(addToGetCartSucess(data));
}
function* CartRemmoveProducts({ payload }) {
  const { id } = payload;

  try {
    yield call(api.delete, `cart/${id}`);
    yield put(removeFromCartSucess());
  } catch (error) {
    Alert.alert('Error', 'Erro ao remover este produto.');
    yield put(removeFromCartFailed());
  }
}

export default all([
  takeLatest('@cart/ADD_GET_CART_REQUEST', getCartProducts),
  takeLatest('@cart/REMOVE_REQUEST', CartRemmoveProducts),
]);
