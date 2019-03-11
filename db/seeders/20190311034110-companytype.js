'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('CompanyTypes', [{
        id: 1,
        description: "Estrangeiro",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        id: 2,
        description: "Fornecimento",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        id: 3,
        description: "Consultoria",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        id: 4,
        description: "Mão de obra até 15 dias",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('CompanyTypes', null, {});
  }
};
