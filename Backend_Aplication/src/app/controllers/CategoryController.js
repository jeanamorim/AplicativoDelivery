import Category from '../models/Category';
import File from '../models/File';
import Estabelecimento from '../models/Estabelecimento';
import Cache from '../../lib/Cache';

// import AdminCheckService from '../../services/AdminCheckService';

class CategoryController {
  async store(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });
    const { name, image_id } = req.body;

    const categories = await Category.create({
      estabelecimento_id: req.estabelecimentoId,
      name,
      image_id,
    });

    // await Cache.invalidate('categories');

    return res.json(categories);
  }

  async index(req, res) {
    //  const cached = await Cache.get('categories');

    // if (cached) return res.json(cached);

    const categories = await Category.findAll({
      where: {
        estabelecimento_id: req.estabelecimentoId,
      },
      attributes: ['id', 'name'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['path', 'url'],
        },
        {
          model: Estabelecimento,
          as: 'estabelecimento',
          attributes: ['id', 'name_loja'],
        },
      ],
    });

    // await Cache.set('categories', categories);

    return res.json(categories);
  }

  async update(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    const category = await Category.findByPk(req.params.id);

    const { id, name, image_id } = await category.update(req.body);

    await Cache.invalidate('categories');

    return res.json({ id, name, image_id });
  }

  async delete(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    await Cache.invalidate('categories');

    return res.json();
  }
}

export default new CategoryController();
