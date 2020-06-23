import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Order from '../models/Order';
import OrderDetail from '../models/OrderDetail';
import Estabelecimento from '../models/Estabelecimento';
import Product from '../models/Product';
import File from '../models/File';

class RelatorioPedidosControlersData {
  async index(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);

    const order = await Order.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,

        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      attributes: [
        'id',
        'date',
        'status',
        'payment_method',
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
          model: Estabelecimento,
          as: 'estabelecimento',
          attributes: ['id', 'name_loja'],
        },
      ],
      order: ['date'],
    });

    return res.json(order);
  }
}

export default new RelatorioPedidosControlersData();
