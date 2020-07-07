import File from '../../models/File';

import Categoria from '../../models/Category';

class ListCategoriaIds {
  async index(req, res) {
    const categoria = await Categoria.findAll({
      where: {
        id: req.params.id,
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

    return res.json(categoria);
  }
}

export default new ListCategoriaIds();
