import Sequelize, { Model } from 'sequelize';

class OpcaoVariacao extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.FLOAT,
        status: Sequelize.STRING,
      },
      {
        sequelize: connection,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Variacao, {
      as: 'variacao',
      foreignKey: 'variacao_id',
    });
  }
}

export default OpcaoVariacao;
