import File from '../../models/File';
import Product from '../../models/Product';
import Variacao from '../../models/Variacao';
import Opcao from '../../models/Opcao';
import Category from '../../models/Category';
import Ofertas from '../../models/Offer';

class ListEstabelecimentoPorOfertasControllers {
  async index(req, res) {
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

    return res.json(listOffers);
  }
}

export default new ListEstabelecimentoPorOfertasControllers();
