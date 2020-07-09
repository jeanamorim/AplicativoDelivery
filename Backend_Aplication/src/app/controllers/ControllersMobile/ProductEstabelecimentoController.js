import File from '../../models/File';
import Cache from '../../../lib/Cache';
import Product from '../../models/Product';

class ProductEstabelecimentoController {
  async index(req, res) {
    const cached = await Cache.get('products_lojas');

    if (cached) return res.json(cached);
    const category = await Product.findAll({
      where: {
        category_id: req.params.id,
      },
      attributes: ['id', 'name', 'description', 'quantity', 'unit', 'price'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['path', 'url'],
        },
      ],
    });

    await Cache.set('products_lojas', category);

    return res.json(category);
  }
}

export default new ProductEstabelecimentoController();
