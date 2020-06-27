import Product from '../models/Product';
import Variacao from '../models/Variacao';
import Opcao from '../models/Opcao';

// import AdminCheckService from '../../services/AdminCheckService';

class VariacaoController {
  async store(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });
    const { name, minimo, maximo, product_id, opcao } = req.body;

    const variacao = await Variacao.create({
      product_id,
      name,
      minimo,
      maximo,
      opcao,
    });
    if (opcao && opcao.length > 0) {
      variacao.setOpcao(opcao);
    }

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
        {
          model: Opcao,
          as: 'opcao',
          attributes: ['id', 'name', 'price', 'status'],
          through: { attributes: [] },
        },
      ],
    });

    // await Cache.set('categories', categories);

    return res.json(variacao);
  }

  async update(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    const { id } = req.params;
    const post = await Variacao.findByPk(id);

    const { opcao, ...data } = req.body;
    post.update(data);

    if (opcao && opcao.length > 0) {
      post.setOpcao(opcao);
    }

    return res.json(post);
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
