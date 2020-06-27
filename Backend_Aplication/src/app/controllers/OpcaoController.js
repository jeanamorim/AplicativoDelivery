import Opcoes from '../models/Opcao';

// import AdminCheckService from '../../services/AdminCheckService';

class OpcaoController {
  async store(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });
    const { name, price, status } = req.body;

    const opcao = await Opcoes.create({
      name,
      price,
      status,
    });

    return res.json(opcao);
  }

  async index(req, res) {
    const opcao = await Opcoes.findAll({
      attributes: ['id', 'name', 'price', 'status'],
    });

    // await Cache.set('categories', categories);

    return res.json(opcao);
  }

  async update(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    const opcaoVariacao = await Opcoes.findByPk(req.params.id);

    const { id, name, price, status } = await opcaoVariacao.update(req.body);

    return res.json({ id, name, price, status });
  }

  async delete(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    await Opcoes.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new OpcaoController();
