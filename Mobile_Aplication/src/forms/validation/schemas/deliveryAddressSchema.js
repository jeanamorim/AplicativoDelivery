import * as Yup from 'yup';

import translate from '../../../locales';

const deliveryAddressSchema = Yup.object().shape({
  street: Yup.string().required(translate('street_error')),
  street_n: Yup.string().required(translate('street_n_error')),

  reference: Yup.string().required('Um ponto mais próximo de você'),
});

export default deliveryAddressSchema;
