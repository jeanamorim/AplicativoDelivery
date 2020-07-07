import Opcao from '../../models/Opcao';
import Variacao from '../../models/Variacao';

class ListVariacaoId {
  async index(req, res) {
    const variacao = await Variacao.findAll({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name', 'minimo', 'maximo'],
      include: [
        {
          model: Opcao,
          as: 'opcao',
          attributes: ['id', 'name', 'price', 'status'],
          through: { attributes: [] },
        },
      ],
    });

    // await Cache.set('categories', categories);

    return res.json(variacao);
  }
}

export default new ListVariacaoId();
