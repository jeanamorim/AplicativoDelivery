import Order from '../../models/Order';
import db from '../../../database';

const Sequelize = db.connection;

// import AdminCheckService from '../../services/AdminCheckService';

class FaturamentoTotal {
  async index(req, res) {
    const faturamentoTotal = await Order.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
      },
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('subtotal')), 'subtotal'],
      ],
    });

    return res.json(faturamentoTotal);
  }
}

export default new FaturamentoTotal();
