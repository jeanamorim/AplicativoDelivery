import Product from '../models/Product';
import File from '../models/File';
import Category from '../models/Category';

class ProductDetailsController {
  async index(req, res) {
    const product = await Product.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
        category_id: req.params.id,
      },
      attributes: ['id', 'name', 'description', 'price'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['path', 'url'],
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'image',
              attributes: ['path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(product);
  }
}

export default new ProductDetailsController();
