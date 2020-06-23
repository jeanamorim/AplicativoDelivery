import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Estabelecimento extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        name_loja: Sequelize.STRING,
        status: Sequelize.STRING,
        tempo_entrega: Sequelize.STRING,
        avaliacao: Sequelize.STRING,
        categoria: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        phone: Sequelize.STRING,
        birthday: Sequelize.DATE,
        gender: Sequelize.STRING,
        cpf: Sequelize.STRING,
      },
      {
        sequelize: connection,
      },
    );

    this.addHook('beforeSave', async estabelecimento => {
      if (estabelecimento.password) {
        estabelecimento.password_hash = await bcrypt.hash(
          estabelecimento.password,
          8,
        );
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.belongsTo(models.File, { as: 'image', foreignKey: 'image_id' });
  }
}

export default Estabelecimento;
