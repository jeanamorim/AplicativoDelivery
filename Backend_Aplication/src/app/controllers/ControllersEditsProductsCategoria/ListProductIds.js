import File from '../../models/File';

import Product from '../../models/Product';
import Categoria from '../../models/Category';

class ListProductIds {
  async index(req, res) {
    const product = await Product.findAll({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name', 'description', 'quantity', 'unit', 'price'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['path', 'url'],
        },
        {
          model: Categoria,
          as: 'category',
          attributes: ['name'],
        },
      ],
    });

    return res.json(product);
  }
}

export default new ListProductIds();
