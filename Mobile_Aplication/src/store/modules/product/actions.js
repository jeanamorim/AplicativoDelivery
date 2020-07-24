export function addToGetCartRequest(id) {
  return {
    type: '@cart/ADD_GET_CART_REQUEST',
    payload: { id },
  };
}

export const addToGetCartSucess = list => {
  return {
    type: '@cart/ADD_GET_CART_SUCESS',
    list,
  };
};
export function removeFromCart(id) {
  return {
    type: '@cart/REMOVE_REQUEST',
    id,
  };
}
export function removeFromCartSucess() {
  return {
    type: '@cart/REMOVE_SUCESS',
  };
}
export function removeFromCartFailed() {
  return {
    type: '@cart/REMOVE_FAILED',
  };
}

export function updateAmountRequest(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    amount,
  };
}

export function updateAmountSuccess(id, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    id,
    amount,
  };
}

export function updateAmountFailed() {
  return {
    type: '@cart/UPDATE_AMOUNT_FAILED',
  };
}
