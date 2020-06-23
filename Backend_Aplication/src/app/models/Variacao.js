import Sequelize, { Model } from 'sequelize';

class Variacao extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        minimo: Sequelize.FLOAT,
        maximo: Sequelize.FLOAT,
      },
      {
        sequelize: connection,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'product_id',
    });
  }
}

export default Variacao;
