import db from '../database';

import Order from '../app/models/Order';
import Estabelecimento from '../app/models/Estabelecimento';

import Queue from '../lib/Queue';
import Cache from '../lib/Cache';

import OrderCancellationMail from '../app/jobs/OrderCancellationMail';

const sequelize = db.connection;

let transaction;

class CancelOrderService {
  async run({ order_id }) {
    try {
      transaction = await sequelize.transaction();

      const order = await Order.findByPk(order_id, {
        attributes: [
          'id',
          'date',
          'estabelecimento_id',
          'status',
          'canceled_at',
        ],
      });

      if (order.canceled_at) {
        throw new Error('This order has already been canceled');
      }

      order.canceled_at = new Date();
      order.status = 'CANCELADO';

      await order.save(transaction);

      const estabelecimento = await Estabelecimento.findByPk(
        order.estabelecimento_id,
      );

      await Queue.add(OrderCancellationMail.key, {
        orderDetails: {
          estabelecimento,
          orderNumber: order.id,
          orderDate: order.date,
        },
      });

      await Cache.invalidatePrefix('orders:estabelecimento');

      await transaction.commit();

      return order;
    } catch (err) {
      if (transaction) await transaction.rollback();

      throw new Error(err);
    }
  }
}

export default new CancelOrderService();
