import Address from '../../models/Address';

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

    return res.json(endereco);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const endereco = await Address.findAll({
      where: {
        user_id: req.params.id,
      },

      limit: 10,
      offset: (page - 1) * 10,
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

    return res.json();
  }
}

export default new AdressesUserLogadoController();
