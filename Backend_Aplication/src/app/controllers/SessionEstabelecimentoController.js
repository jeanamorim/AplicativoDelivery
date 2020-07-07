import jwt from 'jsonwebtoken';
import File from '../models/File';
import Estabelecimento from '../models/Estabelecimento';
import authConfig from '../../config/auth';

class SessionEstabelecimentoController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await Estabelecimento.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({
        error: 'User not found',
      });
    }

    const checkPassword = await user.checkPassword(password);

    if (!checkPassword) {
      return res.status(401).json({
        error: 'Password does not match',
      });
    }

    const {
      id,
      name,
      name_loja,
      status,
      avaliacao,
      tempo_entrega,
      phone,
      birthday,
      gender,
      cpf,
      categoria,
      image,
    } = user;

    return res.json({
      user: {
        id,
        name,
        name_loja,
        status,
        avaliacao,
        tempo_entrega,
        email,
        phone,
        birthday,
        gender,
        cpf,
        categoria,
        image,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionEstabelecimentoController();
