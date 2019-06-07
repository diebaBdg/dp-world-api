'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'DocumentToSectors',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        DocumentId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'Documents', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION',
        },
        SectorId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'Sectors', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION',
        },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DocumentToSectors');
  }
};
