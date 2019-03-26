'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'MenuToUserTypes',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        MenuId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'Menus', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION',
        },
        UserTypeId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'UserTypes', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION',
        },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MenuToUserTypes');
  }
};
