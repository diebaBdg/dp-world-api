'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('DocumentToCompanyTypes', [{
        id: 1,
        defaultValidity: '1week',
        DocumentId: 1,
        CompanyTypeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 2,
        defaultValidity: '1month',
        DocumentId: 2,
        CompanyTypeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 3,
        DocumentId: 3,
        CompanyTypeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 4,
        defaultValidity: '1year',
        DocumentId: 4,
        CompanyTypeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 5,
        defaultValidity: '1year',
        DocumentId: 3,
        CompanyTypeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 6,
        defaultValidity: '1year',
        DocumentId: 4,
        CompanyTypeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('DocumentToCompanyTypes', null, {});
  }
};
