import File from '../../models/File';

import Category from '../../models/Category';

class CategoriaestabelecimentoControllers {
  async index(req, res) {
    const count = await Category.findAndCountAll();
    const { page = 1 } = req.query;
    const category = await Category.findAll({
      where: {
        estabelecimento_id: req.params.id,
      },
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'name'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['path', 'url'],
        },
      ],
    });
    res.header('X-Total-Count', count.count);
    return res.json(category);
  }
}

export default new CategoriaestabelecimentoControllers();
