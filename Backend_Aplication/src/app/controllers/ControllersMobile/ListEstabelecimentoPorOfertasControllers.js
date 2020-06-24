import File from '../../models/File';
import Product from '../../models/Product';

import Category from '../../models/Category';
import Ofertas from '../../models/Offer';

class ListEstabelecimentoPorOfertasControllers {
  async index(req, res) {
    const category = await Ofertas.findAll({
      where: {
        estabelecimento_id: req.params.id,
      },
      attributes: [
        'id',
        'product_id',
        'quantity',
        'unit',
        'from',
        'to',
        'expiration_date',
      ],
      include: [
        {
          model: Product,
          as: 'product',
          attributes: [
            'id',
            'name',
            'description',
            'price',
            'unit',
            'quantity',
          ],
          include: [
            {
              model: File,
              as: 'image',
              attributes: ['path', 'url'],
            },
            {
              model: Category,
              as: 'category',
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    return res.json(category);
  }
}

export default new ListEstabelecimentoPorOfertasControllers();
