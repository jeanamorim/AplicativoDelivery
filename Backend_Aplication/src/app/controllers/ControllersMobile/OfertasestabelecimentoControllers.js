import File from '../../models/File';
import Product from '../../models/Product';
import Category from '../../models/Category';
import Estabelecimento from '../../models/Estabelecimento';
import Ofertas from '../../models/Offer';
import Variacao from '../../models/Variacao';
import Opcao from '../../models/Opcao';

class OfertasestabelecimentoControllers {
  async index(req, res) {
    const { page = 1 } = req.query;
    const count = await Ofertas.findAndCountAll();
    const category = await Ofertas.findAll({
      where: {
        estabelecimento_id: req.params.id,
      },
      limit: 8,
      offset: (page - 1) * 8,
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
              attributes: ['id', 'name'],
            },
            {
              model: Estabelecimento,
              as: 'estabelecimento',
              attributes: ['id', 'name_loja'],
            },
            {
              model: Variacao,
              as: 'variacao',
              attributes: ['name', 'minimo', 'maximo'],
              through: { attributes: [] },
              include: [
                {
                  model: Opcao,
                  as: 'opcao',
                  attributes: ['id', 'name', 'price', 'status'],
                  through: { attributes: [] },
                },
              ],
            },
          ],
        },
      ],
    });
    res.header('X-Total-Count', count.count);
    return res.json(category);
  }
}

export default new OfertasestabelecimentoControllers();
