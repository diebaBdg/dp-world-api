'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Sectors',
      'email',
      {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Sectors', 'email');
  }
};
