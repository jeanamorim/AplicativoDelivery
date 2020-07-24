import File from '../../models/File';

import Product from '../../models/Product';
import Categoria from '../../models/Category';
import Variacao from '../../models/Variacao';
import Opcao from '../../models/Opcao';

class ListProductIds {
  async index(req, res) {
    const product = await Product.findAll({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name', 'description', 'quantity', 'unit', 'price'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['path', 'url'],
        },
        {
          model: Categoria,
          as: 'category',
          attributes: ['name'],
        },
        {
          model: Variacao,
          as: 'variacao',
          attributes: ['id', 'name', 'minimo', 'maximo'],
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

    return res.json(product);
  }
}

export default new ListProductIds();
