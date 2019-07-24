'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Employees',
      'FunctionId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Functions',
          key: 'id',
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Employees',
      'FunctionId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Functions',
          key: 'id',
        }
      }
    )
  }
};
