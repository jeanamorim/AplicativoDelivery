import Estabelecimento from '../../models/Estabelecimento';
import File from '../../models/File';

class BuscarEstabelecimentoPorId {
  async index(req, res) {
    const product = await Estabelecimento.findAll({
      where: {
        id: req.params.id,
      },
      attributes: [
        'id',
        'name',
        'name_loja',
        'status',
        'avaliacao',
        'categoria',
        'tempo_entrega',
        'email',
        'phone',
        'birthday',
        'gender',
        'cpf',
      ],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['path', 'url'],
        },
      ],
    });

    return res.json(product);
  }
}
export default new BuscarEstabelecimentoPorId();
