'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserStatuses', [{
      id: 1,
      description: "Ativado",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 2,
      description: "Desativado",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserStatuses', null, {});
  }
};
