import OpcaoVariacao from '../../models/Opcao';
import Variacao from '../../models/Variacao';
import Cache from '../../../lib/Cache';

class OpcaoVariacaoEstabControllers {
  async index(req, res) {
    const cached = await Cache.get('opcao_variacao');

    if (cached) return res.json(cached);
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

    await Cache.set('opcao_variacao', opcao);

    return res.json(opcao);
  }
}

export default new OpcaoVariacaoEstabControllers();
