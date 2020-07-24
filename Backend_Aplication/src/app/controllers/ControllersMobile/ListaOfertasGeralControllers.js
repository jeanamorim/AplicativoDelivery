import Offer from '../../models/Offer';
import Product from '../../models/Product';
import File from '../../models/File';
import Category from '../../models/Category';
import Estabelecimento from '../../models/Estabelecimento';
import Variacao from '../../models/Variacao';
import Opcao from '../../models/Opcao';

class ProductEstabelecimentoController {
  async index(req, res) {
    const count = await Offer.findAndCountAll();
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

        {
          model: Estabelecimento,
          as: 'estabelecimento',
          attributes: [
            'id',
            'name',
            'name_loja',
            'status',
            'avaliacao',
            'categoria',
            'tempo_entrega',
            'email',
            'phone',
            'birthday',
            'gender',
            'cpf',
          ],
          include: [
            {
              model: File,
              as: 'image',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    res.header('X-Total-Count', count.count);
    return res.json(offers);
  }
}

export default new ProductEstabelecimentoController();
