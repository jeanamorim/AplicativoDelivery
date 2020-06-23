import Order from '../models/Order';
import OrderDetail from '../models/OrderDetail';
import Product from '../models/Product';
import File from '../models/File';
import User from '../models/User';
// import Cache from '../../lib/Cache';

// import AdminCheckService from '../../services/AdminCheckService';

class UserOrderController {
  async index(req, res) {
    // const cached = await Cache.get(`orders:users:${req.params.id}`);

    // if (cached) return res.json(cached);

    const orders = await Order.findAll({
      where: {
        id: req.params.id,
      },
      attributes: [
        'id',
        'date',
        'user_id',
        'status',
        'ship_postal_code',
        'ship_street',
        'ship_street_n',
        'ship_neighborhood',
        'ship_city',
        'ship_state',
        'ship_complement',
        'ship_reference',
        'delivery_fee',
        'discount',
        'subtotal',
        'total',
      ],
      include: [
        {
          model: OrderDetail,
          as: 'order_details',
          attributes: ['quantity', 'price', 'total'],
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['name', 'description', 'price', 'quantity', 'unit'],
              include: [
                {
                  model: File,
                  as: 'image',
                  attributes: ['path', 'url'],
                },
              ],
            },
          ],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'phone'],
        },
      ],
    });

    // await Cache.set(`orders:users:${req.params.id}`, orders);

    return res.json(orders);
  }
}

export default new UserOrderController();
