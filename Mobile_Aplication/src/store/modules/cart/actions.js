export function addToCartRequest(product, quantidade) {
  return {
    type: '@cart/ADD_REQUEST',
    payload: { product, quantidade },
  };
}

export function addToCartSuccess(product, quantidade) {
  return {
    type: '@cart/ADD_SUCCESS',
    payload: { product, quantidade },
  };
}

export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE',
    payload: { id },
  };
}

export function EmptyCart() {
  return {
    type: '@cart/EMPTY',
  };
}
export function EsvaziarCart() {
  return {
    type: '@cart/ESVAZIAR',
  };
}

export function updateAmountRequest(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    payload: { id, amount },
  };
}

export function updateAmountSuccess(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    payload: { id, amount },
  };
}
