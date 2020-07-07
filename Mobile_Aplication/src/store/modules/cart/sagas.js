import { select, put, all, takeLatest } from 'redux-saga/effects';

import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ payload }) {
  const { product, quantidade, valorTotalPedido, observacao } = payload;

  const productExists = yield select(state =>
    state.cart.find(p => p.id === product.id),
  );

  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + quantidade;

  if (productExists) {
    yield put(updateAmountSuccess(product.id, amount));
  } else {
    const data = {
      ...product,
      amount: quantidade,
      priceItens: valorTotalPedido,
      observacao: observacao,
    };

    yield put(addToCartSuccess(data));
  }
}

function* updateAmount({ payload }) {
  const { id, amount } = payload;
  if (amount <= 0) {
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
