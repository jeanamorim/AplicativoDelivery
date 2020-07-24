import { Op } from 'sequelize';

import Product from '../models/Product';
import File from '../models/File';
import Category from '../models/Category';
import Estabelecimento from '../models/Estabelecimento';
import Variacao from '../models/Variacao';
import Opcao from '../models/Opcao';

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
      variacao,
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
      variacao,
    });
    if (variacao && variacao.length > 0) {
      products.setVariacao(variacao);
    }

    return res.json(products);
  }

  async index(req, res) {
    if (req.params.id) {
      const product = await Product.findByPk(req.params.id, {
        attributes: ['id', 'name', 'description', 'quantity', 'unit', 'price'],
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
          {
            model: Variacao,
            as: 'variacao',
            attributes: ['name', 'minimo', 'maximo'],
            through: { attributes: [] },
            include: [
              {
                model: Opcao,
                as: 'opcao',
                attributes: ['id','name', 'price', 'status'],
                through: { attributes: [] },
              },
            ],
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
            {
              model: Variacao,
              as: 'variacao',
              attributes: ['name', 'minimo', 'maximo'],
              through: { attributes: [] },
              include: [
                {
                  model: Opcao,
                  as: 'opcao',
                  attributes: ['id','name', 'price', 'status'],
                  through: { attributes: [] },
                },
              ],
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
            {
              model: Variacao,
              as: 'variacao',
              attributes: ['name', 'minimo', 'maximo'],
              through: { attributes: [] },
              include: [
                {
                  model: Opcao,
                  as: 'opcao',
                  attributes: ['id','name', 'price', 'status'],
                  through: { attributes: [] },
                },
              ],
            },
          ],
        });

        const productsFormatted = await FormatProductService.run(
          searchedProducts,
        );

        return res.json(productsFormatted);
      }
    }

    return res.json();
  }

  async update(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    const { id } = req.params;
    const post = await Product.findByPk(id);

    const { variacao, ...data } = req.body;
    post.update(data);

    if (variacao && variacao.length > 0) {
      post.setVariacao(variacao);
    }

    return res.json(post);
  }

  async delete(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new ProductController();
