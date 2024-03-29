import storage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'Delivery',
      storage,
      whitelist: ['auth', 'user', 'cart', 'product'],
    },
    reducers,
  );

  return persistedReducer;
};
