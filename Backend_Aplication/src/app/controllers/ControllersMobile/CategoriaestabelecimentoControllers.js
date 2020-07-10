import File from '../../models/File';

import Category from '../../models/Category';

class CategoriaestabelecimentoControllers {
  async index(req, res) {
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

    return res.json(category);
  }
}

export default new CategoriaestabelecimentoControllers();
