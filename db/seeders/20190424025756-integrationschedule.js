'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('IntegrationSchedules', [{
        IntegrationId: 1,
        EmployeeId: 1,
        showedUp: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        validityDate: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('IntegrationSchedules', null, {});
  }
};
