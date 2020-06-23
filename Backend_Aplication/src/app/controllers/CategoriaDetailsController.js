import File from '../models/File';
import Category from '../models/Category';

class CategoriaDetailsController {
  async index(req, res) {
    const category = await Category.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
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

    return res.json(category);
  }
}

export default new CategoriaDetailsController();
