module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OpcaoVariacao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      variacao_id: {
        type: Sequelize.INTEGER,
        references: { model: 'variacao', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      opcao_id: {
        type: Sequelize.INTEGER,
        references: { model: 'opcao', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('OpcaoVariacao');
  },
};
