import File from '../../models/File';
import Cache from '../../../lib/Cache';
import Category from '../../models/Category';

class CategoriaestabelecimentoControllers {
  async index(req, res) {
    const cached = await Cache.get('categoria_of_loja');

    if (cached) return res.json(cached);
    const category = await Category.findAll({
      where: {
        estabelecimento_id: req.params.id,
      },
      attributes: ['id', 'name'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['path', 'url'],
        },
      ],
    });

    await Cache.set('categoria_of_loja', category);

    return res.json(category);
  }
}

export default new CategoriaestabelecimentoControllers();
