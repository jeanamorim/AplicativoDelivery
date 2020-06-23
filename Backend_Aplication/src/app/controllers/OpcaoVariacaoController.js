import OpcaoVariacao from '../models/OpcaoVariacao';
import Variacao from '../models/Variacao';

// import AdminCheckService from '../../services/AdminCheckService';

class OpcaoVariacaoController {
  async store(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });
    const { name, price, status, variacao_id } = req.body;

    const opcaoVariacao = await OpcaoVariacao.create({
      variacao_id,
      name,
      price,
      status,
    });

    return res.json(opcaoVariacao);
  }

  async index(req, res) {
    const opcaoVariaao = await OpcaoVariacao.findAll({
      attributes: ['id', 'name', 'price', 'status'],
      include: [
        {
          model: Variacao,
          as: 'variacao',
          attributes: ['id', 'name'],
        },
      ],
    });

    // await Cache.set('categories', categories);

    return res.json(opcaoVariaao);
  }

  async update(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    const opcaoVariacao = await OpcaoVariacao.findByPk(req.params.id);

    const { id, name, price, status, variacao_id } = await opcaoVariacao.update(
      req.body,
    );

    return res.json({ id, name, price, status, variacao_id });
  }

  async delete(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    await OpcaoVariacao.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new OpcaoVariacaoController();
