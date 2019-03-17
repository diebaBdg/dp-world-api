'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Sectors', [{
        id: 1,
        status: 1,
        name: 'RH',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 2,
        status: 1,
        name: 'Controladoria',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 3,
        status: 1,
        name: 'CDI',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 4,
        status: 1,
        name: 'Ambulatório',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 5,
        status: 1,
        name: 'Segurança do trabalho',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 6,
        status: 1,
        name: 'Segurança patrimonial',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 7,
        status: 1,
        name: 'Almoxarifado',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 8,
        status: 1,
        name: 'Recepção',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 9,
        status: 1,
        name: 'Financeiro',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 10,
        status: 1,
        name: 'Compras',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        id: 11,
        status: 1,
        name: 'Juridico',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Sectors', null, {});
  }
};
