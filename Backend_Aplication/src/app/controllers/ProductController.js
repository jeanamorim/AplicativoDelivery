import { Op } from 'sequelize';

import Product from '../models/Product';
import File from '../models/File';
import Category from '../models/Category';
import Estabelecimento from '../models/Estabelecimento';
import Cache from '../../lib/Cache';

// import AdminCheckService from '../../services/AdminCheckService';
import FormatProductService from '../../services/FormatProductService';

class ProductController {
  async store(req, res) {
    //  await AdminCheckService.run({ user_id: req.userId });

    const {
      name,
      description,
      quantity,
      unit,
      image_id,
      category_id,
      price,
      observacao,
    } = req.body;

    const products = await Product.create({
      estabelecimento_id: req.estabelecimentoId,
      name,
      description,
      quantity,
      unit,
      image_id,
      category_id,
      price,
      observacao,
    });
    await Cache.invalidate('products');
    return res.json(products);
  }

  async index(req, res) {
    if (req.params.id) {
      const product = await Product.findByPk(req.params.id, {
        attributes: [
          'id',
          'name',
          'description',
          'quantity',
          'unit',
          'price',
          'observacao',
        ],
        include: [
          {
            model: File,
            as: 'image',
            attributes: ['path', 'url'],
          },
          {
            model: Category,
            as: 'category',
            attributes: ['id', 'name'],
          },
          {
            model: Estabelecimento,
            as: 'estabelecimento',
            attributes: ['id', 'name_loja'],
          },
        ],
      });

      const productFormatted = await FormatProductService.run(product);

      return res.json(productFormatted);
    }

    if (req.query) {
      if (req.query.category) {
        const products = await Product.findAll({
          where: {
            category_id: req.query.category,
          },
          attributes: [
            'id',
            'name',
            'description',
            'quantity',
            'unit',
            'price',
            'observacao',
          ],
          include: [
            {
              model: File,
              as: 'image',
              attributes: ['path', 'url'],
            },
            {
              model: Category,
              as: 'category',
              attributes: ['id', 'name'],
            },
            {
              model: Estabelecimento,
              as: 'estabelecimento',
              attributes: ['id', 'name_loja'],
            },
          ],
        });

        const productsFormatted = await FormatProductService.run(products);

        return res.json(productsFormatted);
      }
      if (req.query.search) {
        const searchedProducts = await Product.findAll({
          where: {
            name: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          attributes: [
            'id',
            'name',
            'description',
            'quantity',
            'unit',
            'price',
            'observacao',
          ],
          include: [
            {
              model: File,
              as: 'image',
              attributes: ['path', 'url'],
            },
            {
              model: Category,
              as: 'category',
              attributes: ['id', 'name'],
            },
            {
              model: Estabelecimento,
              as: 'estabelecimento',
              attributes: ['id', 'name_loja'],
            },
          ],
        });

        const productsFormatted = await FormatProductService.run(
          searchedProducts,
        );

        return res.json(productsFormatted);
      }
    }

    const cached = await Cache.get('products');

    if (cached) {
      const productsFormatted = await FormatProductService.run(cached);

      return res.json(productsFormatted);
    }

    const productsFormatted = await FormatProductService.run();

    await Cache.set('products', productsFormatted);

    return res.json(productsFormatted);
  }

  async update(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    const product = await Product.findByPk(req.params.id);

    await Cache.invalidate('products');

    const {
      id,
      name,
      description,
      image_id,
      category_id,
      estabelecimento_id,
      quantity,
      unit,
      price,
      observacao,
    } = await product.update(req.body);

    return res.json({
      id,
      name,
      description,
      image_id,
      category_id,
      estabelecimento_id,
      quantity,
      unit,
      price,
      observacao,
    });
  }

  async delete(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    await Cache.invalidate('products');

    return res.json();
  }
}

export default new ProductController();
