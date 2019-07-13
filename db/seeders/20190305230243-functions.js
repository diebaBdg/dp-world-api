'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Functions', [{
      id: 1,
      description: 'Soldador',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 2,
      description: 'Operador de Máquinas',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 3,
      description: 'Manutenção de Veículos',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Functions', null, {});
  }
};
