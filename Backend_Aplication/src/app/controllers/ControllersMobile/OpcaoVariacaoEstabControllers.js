import OpcaoVariacao from '../../models/Opcao';
import Variacao from '../../models/Variacao';

class OpcaoVariacaoEstabControllers {
  async index(req, res) {
    const category = await OpcaoVariacao.findAll({
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

    return res.json(category);
  }
}

export default new OpcaoVariacaoEstabControllers();
