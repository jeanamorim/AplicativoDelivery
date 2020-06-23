import Variacao from '../../models/Variacao';
import Product from '../../models/Product';

class VariacaoProdutoControllers {
  async index(req, res) {
    const category = await Variacao.findAll({
      where: {
        product_id: req.params.id,
      },
      attributes: ['id', 'name', 'minimo', 'maximo'],
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(category);
  }
}

export default new VariacaoProdutoControllers();
