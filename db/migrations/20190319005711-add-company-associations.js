'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Companies',
      'CompanyId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Companies', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
      }
    ).then(res => {
      queryInterface.addColumn(
        'Companies',
        'CompanyTypeId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'CompanyTypes', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
        }
      )
    }).then(res2 => {
      queryInterface.addColumn(
        'Companies',
        'CompanyStatusId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'CompanyStatuses', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'NO ACTION'
        }
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Companies', 'CompanyId')
    .then(res=>{
      queryInterface.removeColumn('Companies', 'CompanyTypeId').then(res2 =>{
        queryInterface.removeColumn('Companies', 'CompanyStatusId')
      })
    })
  }
};
