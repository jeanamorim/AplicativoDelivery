import Cart from '../models/Cart';
import Product from '../models/Product';
import File from '../models/File';

import Cache from '../../lib/Cache';

// mport AdminCheckService from '../../services/AdminCheckService';

class Carrinho {
  async store(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    const {
      product_id,
      estabelecimento_id,
      user_id,
      observacao,
      quantidade,
    } = req.body;

    const id = await Cart.create({
      estabelecimento_id,
      product_id,
      user_id,
      observacao,
      quantidade,
    });
    await Cache.invalidate('cart');
    return res.json(id);
  }

  async index(req, res) {
    const cached = await Cache.get('cart');

    if (cached) return res.json(cached);

    const cart = await Cart.findAll({
      where: {
        estabelecimento_id: req.params.id,
      },
      atributes: ['observacao', 'quantidade'],
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
          ],
        },
      ],
    });

    await Cache.set('cart', cart);

    return res.json(cart);
  }

  async update(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    const cart = await Cart.findByPk(req.params.id);

    const {
      product_id,
      estabelecimento_id,
      user_id,
      observacao,

      quantidade,
    } = await cart.update(req.body);

    await Cache.invalidate('cart');

    return res.json({
      product_id,
      estabelecimento_id,
      user_id,
      observacao,

      quantidade,
    });
  }

  async delete(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    await Cart.destroy({
      where: {
        estabelecimento_id: req.params.id,
      },
    });

    await Cache.invalidate('cart');

    return res.json();
  }
}

export default new Carrinho();
