import Cart from '../../models/Cart';

// mport AdminCheckService from '../../services/AdminCheckService';

class Carrinho {
  async delete(req, res) {
    // await AdminCheckService.run({ user_id: req.userId });

    await Cart.destroy({
      where: {
        estabelecimento_id: req.params.id,
      },
    });

    return res.json();
  }
}

export default new Carrinho();
