import Address from '../models/Address';

class AddressController {
  async store(req, res) {
    const {
      postal_code,
      street,
      street_n,
      neighborhood,
      city,
      state,
      complement,
      reference,
    } = req.body;

    const { id } = await Address.create({
      user_id: req.userId,
      postal_code,
      street,
      street_n,
      neighborhood,
      city,
      state,
      complement,
      reference,
    });

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

  async index(req, res) {
    const address = await Address.findOne({
      where: {
        user_id: req.userId,
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

    return res.json(address);
  }

  async update(req, res) {
    const address = await Address.findOne({
      where: {
        user_id: req.userId,
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
}

export default new AddressController();
