import Estabelecimento from '../models/Estabelecimento';
import File from '../models/File';
import Cache from '../../lib/Cache';

// import AdminCheckService from '../../services/AdminCheckService';

class EstabelecimentoController {
  async store(req, res) {
    const userExists = await Estabelecimento.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const {
      id,
      name,
      name_loja,
      status,
      avaliacao,
      categoria,
      tempo_entrega,
      email,
      phone,
      birthday,
      gender,
      cpf,
    } = await Estabelecimento.create(req.body);

    await Cache.invalidate('estabelecimento');

    return res.json({
      id,
      name,
      name_loja,
      status,
      avaliacao,
      categoria,
      tempo_entrega,
      email,
      phone,
      birthday,
      gender,
      cpf,
    });
  }

  async index(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    // const cached = await Cache.get('estabelecimento');

    // if (cached) return res.json(cached);

    const estabelecimento = await Estabelecimento.findAll({
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

    // await Cache.set('estabelecimento', estabelecimento);

    return res.json(estabelecimento);
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const estabelecimento = await Estabelecimento.findByPk(
      req.body.estabelecimento_id
        ? req.body.estabelecimento_id
        : req.estabelecimentoId,
    );

    if (email !== estabelecimento.email) {
      const userExists = await Estabelecimento.findOne({
        where: {
          email,
        },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await estabelecimento.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const {
      id,
      name,
      name_loja,
      status,
      avaliacao,
      categoria,
      tempo_entrega,
      phone,
      birthday,
      gender,
      cpf,
    } = await estabelecimento.update(req.body);

    await Cache.invalidate('estabelecimento');

    return res.json({
      id,
      name,
      name_loja,
      status,
      avaliacao,
      categoria,
      tempo_entrega,
      email,
      phone,
      birthday,
      gender,
      cpf,
    });
  }
}

export default new EstabelecimentoController();
