import File from '../../models/File';

import Product from '../../models/Product';

class ProductEstabelecimentoController {
  async index(req, res) {
    const category = await Product.findAll({
      where: {
        estabelecimento_id: req.params.id,
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

    return res.json(category);
  }
}

export default new ProductEstabelecimentoController();
