import Product from '../models/Product';
import Variacao from '../models/Variacao';

// import AdminCheckService from '../../services/AdminCheckService';

class VariacaoController {
  async store(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });
    const { name, minimo, maximo, product_id } = req.body;

    const variacao = await Variacao.create({
      product_id,
      name,
      minimo,
      maximo,
    });

    return res.json(variacao);
  }

  async index(req, res) {
    const variacao = await Variacao.findAll({
      attributes: ['id', 'name', 'minimo', 'maximo'],
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name'],
        },
      ],
    });

    // await Cache.set('categories', categories);

    return res.json(variacao);
  }

  async update(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    const variacao = await Variacao.findByPk(req.params.id);

    const { id, name, minimo, maximo, product_id } = await variacao.update(
      req.body,
    );

    return res.json({ id, name, minimo, maximo, product_id });
  }

  async delete(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    await Variacao.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new VariacaoController();
