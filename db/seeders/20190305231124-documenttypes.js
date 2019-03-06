'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('DocumentTypes', [{
        description: 'Empresa',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        description: 'Colaborador',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        description: 'Mensais',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        description: 'Mensais colaborador',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {   Example:
      return queryInterface.bulkDelete('People', null, {});
  }
};
