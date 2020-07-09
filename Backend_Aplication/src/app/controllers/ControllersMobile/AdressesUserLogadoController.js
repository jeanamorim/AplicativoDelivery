import Address from '../../models/Address';
import Cache from '../../../lib/Cache';

class AdressesUserLogadoController {
  async store(req, res) {
    const {
      user_id,
      postal_code,
      street,
      street_n,
      neighborhood,
      city,
      state,
      complement,
      reference,
    } = req.body;

    const endereco = await Address.create({
      user_id,
      postal_code,
      street,
      street_n,
      neighborhood,
      city,
      state,
      complement,
      reference,
    });

    await Cache.invalidate('endereco_user_logado');

    return res.json(endereco);
  }

  async index(req, res) {
    const cached = await Cache.get('endereco_user_logado');

    if (cached) return res.json(cached);

    const endereco = await Address.findAll({
      where: {
        user_id: req.params.id,
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
    await Cache.set('endereco_user_logado', endereco);
    return res.json(endereco);
  }

  async update(req, res) {
    const address = await Address.findOne({
      where: {
        id: req.params.id,
      },
    });

    const {
      id,
      postal_code,
      street,
      street_n,
      neighborhood,
      city,
      state,
      complement,
      reference,
    } = await address.update(req.body);
    await Cache.invalidate('endereco_user_logado');
    return res.json({
      id,
      postal_code,
      street,
      street_n,
      neighborhood,
      city,
      state,
      complement,
      reference,
    });
  }

  async delete(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    await Address.destroy({
      where: {
        id: req.params.id,
      },
    });
    await Cache.invalidate('endereco_user_logado');
    return res.json();
  }
}

export default new AdressesUserLogadoController();
