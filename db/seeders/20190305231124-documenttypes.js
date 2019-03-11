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
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('DocumentTypes', null, {});
  }
};
