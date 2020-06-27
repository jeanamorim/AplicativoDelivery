import Sequelize, { Model } from 'sequelize';

class Opcao extends Model {
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
    this.belongsToMany(models.Variacao, {
      through: 'OpcaoVariacao',
      as: 'opcao',
      foreignKey: 'opcao_id',
    });
  }
}

export default Opcao;
