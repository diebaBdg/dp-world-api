'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Documents',
      'FunctionId',
      {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Functions', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Documents', // name of Source model
      'functionId' // key we want to remove
    );
  }
};
