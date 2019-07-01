'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      userName: {
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      phone2: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserTypeId: {
        type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'UserTypes', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
      },
      UserStatusId: {
        type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'UserStatuses', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
      },
      SectorId: {
        type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Sectors', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
      },
      CompanyId: {
        type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'Companies', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};