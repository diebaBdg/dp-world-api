'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EmployeeAttachments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      originalName: {
        type: Sequelize.STRING
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      validityDate: {
        type: Sequelize.DATE
      },
      encoding: {
        type: Sequelize.STRING
      },
      mimetype: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.BIGINT
      },
      path: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      AttachmentStatusId: {
        type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'AttachmentStatuses', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
      },
      EmployeeId: {
        type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Employees', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
      },
      DocumentId: {
        type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Documents', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EmployeeAttachments');
  }
};