import Frete from '../models/Frete';
import Estabelecimento from '../models/Estabelecimento';

// import AdminCheckService from '../../services/AdminCheckService';

class OpcaoVariacaoController {
  async store(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });
    const { name, price, status } = req.body;

    const frete = await Frete.create({
      estabelecimento_id: req.estabelecimentoId,
      name,
      price,
      status,
    });

    return res.json(frete);
  }

  async index(req, res) {
    const frete = await Frete.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
      },
      attributes: ['id', 'name', 'price', 'status'],
      include: [
        {
          model: Estabelecimento,
          as: 'estabelecimento',
          attributes: ['id', 'name_loja'],
        },
      ],
    });

    // await Cache.set('categories', categories);

    return res.json(frete);
  }

  async update(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    const frete = await Frete.findByPk(req.params.id);

    const { id, name, price, status } = await frete.update(req.body);

    return res.json({ id, name, price, status });
  }

  async delete(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    await Frete.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new OpcaoVariacaoController();
