'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'DocumentsToCompanyTypes',
      'DocumentId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Documents', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
      }
    ).then(() => {
      return queryInterface.addColumn(
        'DocumentsToCompanyTypes',
        'CompanyTypeId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'CompanyTypes', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION',
        }
      )
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'DocumentsToCompanyTypes', // name of Source model
      'DocumentId' // key we want to remove
    ).then(() => {
      return queryInterface.removeColumn(
        'DocumentsToCompanyTypes', // name of Source model
        'CompanyTypeId' // key we want to remove
      )
    });
  }
};
