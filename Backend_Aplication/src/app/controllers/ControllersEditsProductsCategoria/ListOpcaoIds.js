import Opcao from '../../models/Opcao';

class ListOpcaoIds {
  async index(req, res) {
    const opcao = await Opcao.findAll({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name', 'price', 'status'],
    });

    // await Cache.set('categories', categories);

    return res.json(opcao);
  }
}

export default new ListOpcaoIds();
