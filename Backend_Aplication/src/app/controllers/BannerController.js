import Banner from '../models/Banner';
import File from '../models/File';

// import AdminCheckService from '../../services/AdminCheckService';

class BannerController {
  async store(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    const banner = await Banner.create(req.body);

    return res.json(banner);
  }

  async index(req, res) {
    const banners = await Banner.findAll({
      attributes: ['id'],
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['path', 'url'],
        },
      ],
    });

    return res.json(banners);
  }

  async delete(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    await Banner.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new BannerController();
