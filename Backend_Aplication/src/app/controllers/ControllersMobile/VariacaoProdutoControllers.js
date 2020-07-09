import Variacao from '../../models/Variacao';
import Product from '../../models/Product';
import Opcao from '../../models/Opcao';
import Cache from '../../../lib/Cache';

class VariacaoProdutoControllers {
  async index(req, res) {
    const cached = await Cache.get('variacao_product');

    if (cached) return res.json(cached);
    const variacao = await Variacao.findAll({
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
        {
          model: Opcao,
          as: 'opcao',
          attributes: ['id', 'name', 'price', 'status'],
          through: { attributes: [] },
        },
      ],
    });

    await Cache.set('variacao_product', variacao);

    return res.json(variacao);
  }
}

export default new VariacaoProdutoControllers();
