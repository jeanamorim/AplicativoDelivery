import Address from '../../models/Address';

class AdressesUserLogadoController {
  async index(req, res) {
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

    return res.json(endereco);
  }
}

export default new AdressesUserLogadoController();
