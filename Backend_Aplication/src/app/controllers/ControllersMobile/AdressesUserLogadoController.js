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
    const category = await Address.findAll({
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

    return res.json(category);
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
