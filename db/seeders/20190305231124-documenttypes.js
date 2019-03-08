'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('DocumentTypes', [{
        id: 1,
        description: 'Empresa',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 2,
        description: 'Colaborador',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 3,
        description: 'Mensais',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 4,
        description: 'Mensais colaborador',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('DocumentTypes', null, {});
  }
};
