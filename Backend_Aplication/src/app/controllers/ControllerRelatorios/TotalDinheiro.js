import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Order from '../../models/Order';
import db from '../../../database';

const Sequelize = db.connection;

// import AdminCheckService from '../../services/AdminCheckService';

class TotalDinheiro {
  async index(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);

    const totalDinheiro = await Order.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
        payment_method: 'DINHEIRO',

        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('subtotal')), 'subtotal'],
      ],
    });

    return res.json(totalDinheiro);
  }
}

export default new TotalDinheiro();
