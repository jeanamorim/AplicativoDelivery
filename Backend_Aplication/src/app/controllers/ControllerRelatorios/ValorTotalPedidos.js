import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Order from '../../models/Order';
import db from '../../../database';

const Sequelize = db.connection;

// import AdminCheckService from '../../services/AdminCheckService';

class ValorTotalPedidos {
  async index(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);

    const Valortotalpedidos = await Order.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,

        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('subtotal')), 'subtotal'],

        [Sequelize.fn('sum', Sequelize.col('delivery_fee')), 'delivery_fee'],
      ],
    });

    return res.json(Valortotalpedidos);
  }
}

export default new ValorTotalPedidos();
