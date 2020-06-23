import Order from '../models/Order';
import db from '../../database';

const Sequelize = db.connection;

class RelatorioController {
  async index(req, res) {
    const ValorTotalCliente = await Order.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
      },
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('total')), 'total_cliente'],
      ],

      group: ['total'],
    });

    const ValorDevedorCliente = await Order.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
      },
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('total')), 'total_devedor'],
      ],

      group: ['total'],
    });

    return res.json([ValorTotalCliente, ValorDevedorCliente]);
  }
}

export default new RelatorioController();
