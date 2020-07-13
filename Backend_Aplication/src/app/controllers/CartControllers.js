import Cart from '../models/Cart';
import Product from '../models/Product';
import File from '../models/File';

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

    return res.json(id);
  }

  async index(req, res) {
    const count = await Cart.findAndCountAll();
    const { page = 1 } = req.query;
    const cart = await Cart.findAll({
      where: {
        estabelecimento_id: req.params.id,
      },
      limit: 10,
      offset: (page - 1) * 10,
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
    res.header('X-Total-Count', count.count);
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

    return res.json();
  }
}

export default new Carrinho();
