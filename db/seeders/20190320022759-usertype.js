'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('UserTypes', [{
        id: 1,
        description: "Interno",
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        id: 2,
        description: "Externo (Empresa)",
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('UserTypes', null, {});
  }
};
