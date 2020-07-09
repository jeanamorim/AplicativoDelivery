import Address from '../../models/Address';
import Cache from '../../../lib/Cache';

class AdressesUserLogadoController {
  async index(req, res) {
    const cached = await Cache.get('endereco_user');

    if (cached) return res.json(cached);
    const endereco = await Address.findAll({
      where: {
        id: req.params.id,
      },
      attributes: [
        'id',
        'user_id',
        'postal_code',
        'street',
        'street_n',
        'neighborhood',
        'city',
        'state',
        'complement',
        'reference',
      ],
    });

    await Cache.set('endereco_user', endereco);

    return res.json(endereco);
  }
}

export default new AdressesUserLogadoController();
