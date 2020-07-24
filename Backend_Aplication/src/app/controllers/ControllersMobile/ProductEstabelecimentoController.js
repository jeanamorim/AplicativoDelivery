import File from '../../models/File';

import Product from '../../models/Product';
import Estabelecimento from '../../models/Estabelecimento';
import Variacao from '../../models/Variacao';
import Opcao from '../../models/Opcao';

class ProductEstabelecimentoController {
  async index(req, res) {
    const count = await Product.findAndCountAll();
    const { page = 1 } = req.query;
    const category = await Product.findAll({
      where: {
        category_id: req.params.id,
      },
      limit: 5,
      offset: (page - 1) * 5,
      attributes: ['id', 'name', 'description', 'quantity', 'unit', 'price'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['path', 'url'],
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
    });
    res.header('X-Total-Count', count.count);
    return res.json(category);
  }
}

export default new ProductEstabelecimentoController();
