'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Companies',
      'SectorId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Sectors', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Companies', 'SectorId');
  }
};
