import OpcaoVariacao from '../../models/Opcao';
import Variacao from '../../models/Variacao';

class OpcaoVariacaoEstabControllers {
  async index(req, res) {
    const opcao = await OpcaoVariacao.findAll({
      where: {
        variacao_id: req.params.id,
      },
      attributes: ['id', 'name', 'price', 'status'],
      include: [
        {
          model: Variacao,
          as: 'variacao',
          attributes: ['id', 'name', 'minimo', 'maximo', 'product_id'],
        },
      ],
    });

    return res.json(opcao);
  }
}

export default new OpcaoVariacaoEstabControllers();
