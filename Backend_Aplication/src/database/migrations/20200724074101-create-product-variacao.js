module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProductsVariacoes', {
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
      product_id: {
        type: Sequelize.INTEGER,
        references: { model: 'products', key: 'id' },
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
    return queryInterface.dropTable('ProductsVariacoes');
  },
};
