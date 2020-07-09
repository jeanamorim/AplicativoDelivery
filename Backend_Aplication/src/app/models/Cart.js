import Sequelize, { Model } from 'sequelize';

class Cart extends Model {
  static init(connection) {
    super.init(
      {
        observacao: Sequelize.STRING,

        quantidade: Sequelize.FLOAT,
      },
      {
        sequelize: connection,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    this.belongsTo(models.Product, { as: 'product', foreignKey: 'product_id' });
    this.belongsTo(models.Estabelecimento, {
      foreignKey: 'estabelecimento_id',
      as: 'estabelecimento',
    });
  }
}

export default Cart;
