'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Functions',
      'status',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Functions', 'status');
  }
};
