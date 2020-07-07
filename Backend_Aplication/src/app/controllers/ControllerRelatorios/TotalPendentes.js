import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Order from '../../models/Order';
import db from '../../../database';

const Sequelize = db.connection;

// import AdminCheckService from '../../services/AdminCheckService';

class TotalPendentes {
  async index(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);

    const PedidosPendentes = await Order.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
        status: 'PENDENTE',

        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'total']],
    });

    return res.json(PedidosPendentes);
  }
}

export default new TotalPendentes();
