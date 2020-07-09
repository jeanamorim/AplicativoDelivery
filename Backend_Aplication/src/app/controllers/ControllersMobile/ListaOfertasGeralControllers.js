import { isBefore, parseISO } from 'date-fns';
import Offer from '../../models/Offer';
import Product from '../../models/Product';
import File from '../../models/File';
import Category from '../../models/Category';
import Estabelecimento from '../../models/Estabelecimento';
import Cache from '../../../lib/Cache';

class ProductEstabelecimentoController {
  async index(req, res) {
    const cached = await Cache.get('ofertas_geral');

    if (cached) return res.json(cached);

    const offers = await Offer.findAll({
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
        {
          model: Estabelecimento,
          as: 'estabelecimento',
          attributes: ['id', 'name_loja'],
        },
      ],
    });

    const expiredCheck = JSON.parse(JSON.stringify(offers)).filter(
      offer => !isBefore(parseISO(offer.expiration_date), new Date()),
    );

    // await Cache.set('offers', expiredCheck);

    await Cache.set('ofertas_geral', expiredCheck);

    return res.json(expiredCheck);
  }
}

export default new ProductEstabelecimentoController();
