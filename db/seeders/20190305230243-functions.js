'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Functions', [{
      description: 'Soldador',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      description: 'Operador de Máquinas',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      description: 'Manutenção de Veículos',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Function', null, {});
  }
};
