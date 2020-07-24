import produce from 'immer';

const INITIAL_STATE = [];

export default function product(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case ' @cart/ADD_GET_CART_SUCESS':
        return [action.list];
      case '@cart/REMOVE_REQUEST': {
        draft.loading = false;
        break;
      }
      case '@cart/REMOVE_SUCESS': {
        draft.loading = false;
        break;
      }
      case '@cart/REMOVE_FAILED': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
