import Address from '../../models/Address';

class AdressesUserLogadoController {
  async index(req, res) {
    const category = await Address.findAll({
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

    return res.json(category);
  }
}

export default new AdressesUserLogadoController();
