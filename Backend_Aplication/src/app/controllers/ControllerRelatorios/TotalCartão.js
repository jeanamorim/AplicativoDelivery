import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Order from '../../models/Order';
import db from '../../../database';

const Sequelize = db.connection;

// import AdminCheckService from '../../services/AdminCheckService';

class TotalCartao {
  async index(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);

    const totalCartao = await Order.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
        payment_method: 'CARTAO',

        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      attributes: [[Sequelize.fn('sum', Sequelize.col('total')), 'total']],
    });

    return res.json(totalCartao);
  }
}

export default new TotalCartao();
