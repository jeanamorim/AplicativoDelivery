import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Order from '../models/Order';
import db from '../../database';

const Sequelize = db.connection;

// import AdminCheckService from '../../services/AdminCheckService';

class ValorTotalPedidosControllers {
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
        [Sequelize.fn('sum', Sequelize.col('total')), 'total'],

        [Sequelize.fn('sum', Sequelize.col('delivery_fee')), 'delivery_fee'],
      ],

      group: ['total', 'delivery_fee'],
    });

    const totalDinheiro = await Order.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
        payment_method: 'DINHEIRO',

        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      attributes: [[Sequelize.fn('sum', Sequelize.col('total')), 'total']],

      group: ['total'],
    });

    const totalCartao = await Order.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
        payment_method: 'CARTAO',

        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      attributes: [[Sequelize.fn('sum', Sequelize.col('total')), 'total']],

      group: ['total'],
    });
    const PedidosEntregue = await Order.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
        status: 'ENTREGUE',

        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'total']],

      group: ['total'],
    });
    const PedidosPendentes = await Order.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
        status: 'PENDENTE',

        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'total']],

      group: ['total'],
    });
    const PedidosCancelado = await Order.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
        status: 'CANCELADO',

        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'total']],

      group: ['total'],
    });

    const TotalPedidos = await Order.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,

        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      attributes: [[Sequelize.fn('count', Sequelize.col('id')), 'total']],

      group: ['total'],
    });

    return res.json({
      Valortotalpedidos,
      totalDinheiro,
      totalCartao,
      PedidosEntregue,
      PedidosPendentes,
      PedidosCancelado,
      TotalPedidos,
    });
  }
}

export default new ValorTotalPedidosControllers();
