import File from '../../models/File';

import Product from '../../models/Product';

class ProductEstabelecimentoController {
  async index(req, res) {
    const count = await Product.findAndCountAll();
    const { page = 1 } = req.query;
    const category = await Product.findAll({
      where: {
        category_id: req.params.id,
      },
      limit: 8,
      offset: (page - 1) * 8,
      attributes: ['id', 'name', 'description', 'quantity', 'unit', 'price'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['path', 'url'],
        },
      ],
    });
    res.header('X-Total-Count', count.count);
    return res.json(category);
  }
}

export default new ProductEstabelecimentoController();
