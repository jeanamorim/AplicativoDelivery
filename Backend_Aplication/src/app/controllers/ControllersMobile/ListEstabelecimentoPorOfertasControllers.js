import File from '../../models/File';
import Product from '../../models/Product';
import Cache from '../../../lib/Cache';
import Category from '../../models/Category';
import Ofertas from '../../models/Offer';

class ListEstabelecimentoPorOfertasControllers {
  async index(req, res) {
    const cached = await Cache.get('list_ofers_loja');

    if (cached) return res.json(cached);
    const listOffers = await Ofertas.findAll({
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

    await Cache.set('list_ofers_loja', listOffers);

    return res.json(listOffers);
  }
}

export default new ListEstabelecimentoPorOfertasControllers();
