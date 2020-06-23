import { Op } from 'sequelize';
import Estabelecimento from '../../models/Estabelecimento';
import File from '../../models/File';

class BuscarEstabelecimentoCategoriaControllers {
  async index(req, res) {
    if (req.params.id) {
      const product = await Estabelecimento.findByPk(req.params.id, {
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

    if (req.query) {
      if (req.query.category) {
        const products = await Estabelecimento.findAll({
          where: {
            categoria: req.query.category,
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

        return res.json(products);
      }
      if (req.query.search) {
        const searchedProducts = await Estabelecimento.findAll({
          where: {
            name_loja: {
              [Op.iLike]: `%${req.query.search}%`,
            },
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

        return res.json(searchedProducts);
      }
    }

    return res.json('');
  }
}
export default new BuscarEstabelecimentoCategoriaControllers();
