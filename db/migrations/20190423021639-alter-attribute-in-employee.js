'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Employees',
      'email',
      {
        type: Sequelize.STRING
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Employees',
      'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    )
  }
};
